import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { colleges } from './data/colleges';

const prisma = new PrismaClient();

async function main() {
  const slugs = new Set<string>();
  for (const college of colleges) {
    if (slugs.has(college.slug)) throw new Error(`Duplicate slug in seed data: ${college.slug}`);
    slugs.add(college.slug);
  }

  // `--if-changed` (used when the server starts) skips seeding when the database already has
  // exactly this many colleges, so restarts don't wipe students' reviews and saved lists.
  if (process.argv.includes('--if-changed')) {
    const existing = await prisma.college.count();
    if (existing === colleges.length) {
      console.log(`Database already has ${existing} colleges; skipping seed`);
      return;
    }
  }

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  await prisma.user.upsert({
    where: { email: 'demo@student.com' },
    update: {},
    create: { name: 'Demo Student', email: 'demo@student.com', password: await bcrypt.hash('password123', 12) }
  });

  for (const { courses, ...college } of colleges) {
    try {
      await prisma.college.create({
        data: {
          ...college,
          courses: { create: courses.map(course => ({ ...course, fees: course.fees ?? college.fees ?? 0 })) }
        }
      });
    } catch (error) {
      console.error(`\nFailed to seed "${college.name}". If the error mentions an unknown field, run \`npm run db:deploy\` first.\n`);
      throw error;
    }
  }

  console.log(`Seeded ${colleges.length} colleges`);
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
