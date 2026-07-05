import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parentId: z.string().nullable().optional(),
})

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>

export interface Category {
  id: string
  name: string
  slug?: string
  parentId: string | null
  parent?: { id: string; name: string } | null
  _count?: { childCategories: number }
  createdAt?: string
  updatedAt?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  pagination?: PaginationMeta
}
