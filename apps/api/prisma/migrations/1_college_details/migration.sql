-- College data is reloaded by `npm run seed` after this migration.
-- Old sample colleges and their seeded (non-user) reviews are cleared first,
-- because the new required columns cannot be filled for existing rows.
DELETE FROM "SavedCollege";
DELETE FROM "Review";
DELETE FROM "Course";
DELETE FROM "College";

-- AlterTable
ALTER TABLE "College" DROP COLUMN "location",
ADD COLUMN     "campusAcres" DOUBLE PRECISION,
ADD COLUMN     "campusLife" TEXT[],
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cons" TEXT[],
ADD COLUMN     "established" INTEGER,
ADD COLUMN     "facilities" TEXT[],
ADD COLUMN     "fests" TEXT[],
ADD COLUMN     "hostelAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hostelFees" INTEGER,
ADD COLUMN     "medianPackage" DOUBLE PRECISION,
ADD COLUMN     "nirfRank" INTEGER,
ADD COLUMN     "nirfScore" DOUBLE PRECISION,
ADD COLUMN     "nirfYear" INTEGER,
ADD COLUMN     "ownership" TEXT NOT NULL,
ADD COLUMN     "pros" TEXT[],
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sourceNote" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "fees" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "placementRate" DROP NOT NULL,
ALTER COLUMN "averagePackage" DROP NOT NULL,
ALTER COLUMN "minRank" DROP NOT NULL,
ALTER COLUMN "maxRank" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "student",
ADD COLUMN     "academics" INTEGER,
ADD COLUMN     "campusLife" INTEGER,
ADD COLUMN     "cons" TEXT,
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "infrastructure" INTEGER,
ADD COLUMN     "placements" INTEGER,
ADD COLUMN     "pros" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE INDEX "College_state_idx" ON "College"("state");

-- CreateIndex
CREATE INDEX "College_nirfRank_idx" ON "College"("nirfRank");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_collegeId_key" ON "Review"("userId", "collegeId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

