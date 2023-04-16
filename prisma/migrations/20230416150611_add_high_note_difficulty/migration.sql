-- CreateEnum
CREATE TYPE "HighNoteDifficultyLevel" AS ENUM ('EASY', 'MODERATE', 'CHALLENGING', 'EXTREME');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "highNoteDifficulty" "HighNoteDifficultyLevel" NOT NULL DEFAULT 'MODERATE';
