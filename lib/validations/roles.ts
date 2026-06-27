import { z } from "zod"

export const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().min(1, "Description is required"),
  permissionIds: z.array(z.number()).min(1, "Select at least one permission"),
})

export type RoleFormData = z.infer<typeof roleSchema>

export interface Permission {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
  description: string
  permissions: Permission[]
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

export interface RoleQueryParams {
  page?: number
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: string
  searchTerm?: string
}
