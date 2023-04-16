import { z } from "zod";
import { HighNoteDifficultyLevel } from '@prisma/client'

const highNoteDifficultySchema = z.nativeEnum(HighNoteDifficultyLevel)

export const createSongSchema = z.object({
  name: z.string().min(1).max(20),
  songKey: z.string(),
  highNoteDifficulty: highNoteDifficultySchema
})

export type createSongInput = z.TypeOf<typeof createSongSchema>

export const updateSongSchema = z.object({
  songId: z.string().cuid(),
  name: z.string().min(1).max(20),
  songKey: z.string(),
  highNoteDifficulty: highNoteDifficultySchema
})

export type updateSongInput = z.TypeOf<typeof updateSongSchema>

export const deleteSongSchema = z.object({
  songId: z.string().cuid()
})
