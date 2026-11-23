import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils';

const router = Router();

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

router.get('/', asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 6), 1), 20);
  const q = cleanString(req.query.q);
  const location = cleanString(req.query.location);
  const course = cleanString(req.query.course);
  const maxFeesValue = cleanString(req.query.maxFees);
  const maxFees = maxFeesValue ? Number(maxFeesValue) : undefined;

  if (maxFees !== undefined && (!Number.isFinite(maxFees) || maxFees <= 0)) {
    res.status(400).json({ message: 'Max fees must be a positive number' });
    return;
  }

  const where = {
    AND: [
      q ? { name: { contains: q, mode: 'insensitive' as const } } : {},
      location ? { location: { equals: location } } : {},
      course ? { course: { contains: course, mode: 'insensitive' as const } } : {},
      maxFees ? { fees: { lte: maxFees } } : {}
    ]
  };

  const [items, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy: [{ rating: 'desc' }, { placementRate: 'desc' }],
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.college.count({ where })
  ]);

  res.json({ items, meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) } });
}));

router.get('/filters', asyncHandler(async (_req, res) => {
  const colleges = await prisma.college.findMany({ select: { location: true, course: true, exam: true } });
  res.json({
    locations: [...new Set(colleges.map(c => c.location))].sort(),
    courses: [...new Set(colleges.map(c => c.course))].sort(),
    exams: [...new Set(colleges.map(c => c.exam))].sort()
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
      exam: { equals: parsed.data.exam },
      minRank: { lte: parsed.data.rank },
      maxRank: { gte: parsed.data.rank }
    },
    orderBy: [{ rating: 'desc' }, { placementRate: 'desc' }],
    take: 10
  });

  res.json({ matches });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = cleanString(req.params.id);
  const college = await prisma.college.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { courses: true, reviews: true }
  });
  if (!college) {
    res.status(404).json({ message: 'College not found' });
    return;
  }
  res.json(college);
}));

export default router;
