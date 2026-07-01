import { z } from "zod"

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  teamId: z.number().min(1, "Team is required"),
})

export type CreateArticleFormData = z.infer<typeof createArticleSchema>

export interface Article {
  id: string
  title: string
  description: string
  categoryId: string
  teamId: number
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface Category {
  id: string
  name: string
}

export interface Team {
  id: number
  name: string
}
