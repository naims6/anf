import { z } from "zod"

export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  parentId: z.number().nullable().optional(),
  roleId: z.number().nullable().optional(),
  isDefault: z.boolean(),
})

export type TeamFormData = z.infer<typeof teamSchema>

export interface Team {
  id: number
  name: string
  parent?: { id: number; name: string } | null
  role?: { id: number; name: string } | null
  _count?: { teamMembers: number }
  isDefault?: boolean
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

export interface TeamQueryParams {
  page?: number
  limit?: number
  searchTerm?: string
}
