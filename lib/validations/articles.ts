import { z } from "zod"

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
})

export type CreateArticleFormData = z.infer<typeof createArticleSchema>

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  categoryId: string
  status: string
  teamId: number
  publishedAt: string | null
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiPaginatedResponse<T> {
  success: boolean
  message: string
  pagination: PaginationMeta
  data: T
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface Category {
  id: string
  name: string
}

export interface Team {
  id: number
  name: string
}

export interface ArticleReview {
  id: number
  reviewStage: number
  status: string
  comments: string | null
  createdAt: string
  reviewer: {
    id: string
    name: string
    email: string
  }
}

export interface ArticleDetail extends Article {
  author: {
    id: string
    name: string
    email: string
  }
  category: {
    id: string
    name: string
    slug: string
  }
  articleTeams: { id: number; name: string }[]
  articleReviews: ArticleReview[]
}

export const updateArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  teamId: z.number().min(1, "Team is required"),
})

export type UpdateArticleFormData = z.infer<typeof updateArticleSchema>
