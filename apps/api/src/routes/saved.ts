import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils';
import { writeLimiter } from '../security';

const router = Router();
router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const authReq = req as AuthRequest;
  const saved = await prisma.savedCollege.findMany({
    where: { userId: authReq.userId! },
    include: { college: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(saved.map(s => s.college));
}));

router.post('/:collegeId', writeLimiter, asyncHandler(async (req, res) => {
  const authReq = req as AuthRequest;
  const college = await prisma.college.findUnique({ where: { id: req.params.collegeId } });
  if (!college) {
    res.status(404).json({ message: 'College not found' });
    return;
  }

  await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: authReq.userId!, collegeId: req.params.collegeId } },
    update: {},
    create: { userId: authReq.userId!, collegeId: req.params.collegeId }
  });
  res.status(201).json({ message: 'College saved' });
}));

router.delete('/:collegeId', writeLimiter, asyncHandler(async (req, res) => {
  const authReq = req as AuthRequest;
  await prisma.savedCollege.deleteMany({ where: { userId: authReq.userId!, collegeId: req.params.collegeId } });
  res.json({ message: 'College removed from saved list' });
}));

export default router;
