import { Router } from 'express';
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils';

const router = Router();

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

const SORTS: Record<string, Prisma.CollegeOrderByWithRelationInput[]> = {
  nirf: [{ nirfRank: { sort: 'asc', nulls: 'last' } }, { name: 'asc' }],
  fees: [{ fees: { sort: 'asc', nulls: 'last' } }, { name: 'asc' }],
  placement: [{ placementRate: { sort: 'desc', nulls: 'last' } }, { name: 'asc' }],
  // Official NIRF data gives the median; older sample data only has an average.
  package: [{ medianPackage: { sort: 'desc', nulls: 'last' } }, { averagePackage: { sort: 'desc', nulls: 'last' } }, { name: 'asc' }],
  rating: [{ rating: { sort: 'desc', nulls: 'last' } }, { reviewCount: 'desc' }, { name: 'asc' }],
  name: [{ name: 'asc' }]
};

router.get('/', asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 9, 1), 50);
  const q = cleanString(req.query.q);
  const state = cleanString(req.query.state);
  const type = cleanString(req.query.type);
  const ownership = cleanString(req.query.ownership);
  const course = cleanString(req.query.course);
  const exam = cleanString(req.query.exam);
  const sort = SORTS[cleanString(req.query.sort)] ?? SORTS.nirf;
  const maxFeesValue = cleanString(req.query.maxFees);
  const maxFees = maxFeesValue ? Number(maxFeesValue) : undefined;

  if (maxFees !== undefined && (!Number.isFinite(maxFees) || maxFees <= 0)) {
    res.status(400).json({ message: 'Max fees must be a positive number' });
    return;
  }

  const where: Prisma.CollegeWhereInput = {
    AND: [
      q ? { OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } }
      ] } : {},
      state ? { state } : {},
      type ? { type } : {},
      ownership ? { ownership } : {},
      exam ? { exam } : {},
      course ? { courses: { some: { name: { contains: course, mode: 'insensitive' } } } } : {},
      maxFees ? { fees: { lte: maxFees } } : {}
    ]
  };

  const [items, total] = await Promise.all([
    prisma.college.findMany({ where, orderBy: sort, skip: (page - 1) * limit, take: limit }),
    prisma.college.count({ where })
  ]);

  res.json({ items, meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) } });
}));

router.get('/filters', asyncHandler(async (_req, res) => {
  const [colleges, courses] = await Promise.all([
    prisma.college.findMany({ select: { state: true, type: true, exam: true } }),
    prisma.course.findMany({ select: { name: true }, distinct: ['name'], orderBy: { name: 'asc' } })
  ]);
  const unique = (values: string[]) => [...new Set(values)].sort();
  res.json({
    states: unique(colleges.map(c => c.state)),
    types: unique(colleges.map(c => c.type)),
    exams: unique(colleges.map(c => c.exam)),
    courses: courses.map(c => c.name)
  });
}));

router.get('/compare', asyncHandler(async (req, res) => {
  const ids = cleanString(req.query.ids).split(',').filter(Boolean).slice(0, 3);
  if (ids.length < 2) {
    res.status(400).json({ message: 'Select at least 2 colleges' });
    return;
  }

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    include: { courses: true }
  });
  res.json(colleges);
}));

router.post('/predict', asyncHandler(async (req, res) => {
  const schema = z.object({
    exam: z.string().trim().min(2),
    rank: z.coerce.number().int().positive()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const matches = await prisma.college.findMany({
    where: {
      exam: parsed.data.exam,
      minRank: { lte: parsed.data.rank },
      maxRank: { gte: parsed.data.rank }
    },
    orderBy: SORTS.nirf,
    take: 20
  });

  res.json({ matches });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = cleanString(req.params.id);
  const college = await prisma.college.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      courses: { orderBy: { name: 'asc' } },
      reviews: { orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } }
    }
  });
  if (!college) {
    res.status(404).json({ message: 'College not found' });
    return;
  }
  res.json(college);
}));

const score = z.coerce.number().int().min(1).max(5);
const reviewSchema = z.object({
  rating: score,
  academics: score.optional(),
  infrastructure: score.optional(),
  campusLife: score.optional(),
  placements: score.optional(),
  title: z.string().trim().min(3).max(120),
  comment: z.string().trim().min(20, 'Please write at least 20 characters').max(3000),
  pros: z.string().trim().max(1000).optional(),
  cons: z.string().trim().max(1000).optional(),
  graduationYear: z.coerce.number().int().min(1950).max(2040).optional()
});

// A logged-in student writes (or updates) their own review of a college.
router.post('/:id/reviews', requireAuth, asyncHandler(async (req, res) => {
  const userId = (req as AuthRequest).userId!;
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const college = await prisma.college.findUnique({ where: { id: req.params.id }, select: { id: true } });
  if (!college) {
    res.status(404).json({ message: 'College not found' });
    return;
  }

  const review = await prisma.$transaction(async tx => {
    const saved = await tx.review.upsert({
      where: { userId_collegeId: { userId, collegeId: college.id } },
      update: parsed.data,
      create: { ...parsed.data, userId, collegeId: college.id }
    });
    const stats = await tx.review.aggregate({ where: { collegeId: college.id }, _avg: { rating: true }, _count: true });
    await tx.college.update({
      where: { id: college.id },
      data: { rating: stats._avg.rating ? Math.round(stats._avg.rating * 10) / 10 : null, reviewCount: stats._count }
    });
    return saved;
  });

  res.status(201).json(review);
}));

export default router;
