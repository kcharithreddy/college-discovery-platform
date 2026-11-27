import 'dotenv/config';
import { createHash } from 'crypto';
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

  // `--if-changed` (used when the server starts) skips seeding when the database already holds
  // exactly this college data, so restarts don't wipe students' reviews and saved lists.
  // The data's fingerprint is stored as a comment on the College table after each seed.
  const fingerprint = createHash('sha256').update(JSON.stringify(colleges)).digest('hex');
  if (process.argv.includes('--if-changed')) {
    const [row] = await prisma.$queryRaw<{ fingerprint: string | null }[]>`SELECT obj_description('"College"'::regclass) AS fingerprint`;
    if (row?.fingerprint === fingerprint) {
      console.log('College data is unchanged; skipping seed');
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

  // fingerprint is a hex digest, so it is safe to put in the SQL text.
  await prisma.$executeRawUnsafe(`COMMENT ON TABLE "College" IS '${fingerprint}'`);
  console.log(`Seeded ${colleges.length} colleges`);
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
