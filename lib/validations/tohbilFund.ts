import { z } from "zod"

export const createTohbilFundSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  nameBN: z.string().min(2, "Bengali name must be at least 2 characters"),
})

export type CreateTohbilFundFormData = z.infer<typeof createTohbilFundSchema>

export const updateTohbilFundSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  nameBN: z.string().min(2, "Bengali name must be at least 2 characters"),
})

export type UpdateTohbilFundFormData = z.infer<typeof updateTohbilFundSchema>

export interface TohbilFund {
  id: string
  name: string
  nameBN: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
