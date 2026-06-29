import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.number().positive("Role is required"),
  teamId: z.number().optional(),
})

export type CreateUserFormData = z.infer<typeof createUserSchema>

export interface User {
  id: string
  name: string
  email: string
  status: string
  role: {
    id: number
    name: string
  }
  team?: {
    id: number
    name: string
  } | null
}

export interface Role {
  id: number
  name: string
}

export interface TeamOption {
  id: number
  name: string
}

export interface UserDetails {
  id: string
  name: string
  email: string
  phone: string | null
  status: string
  roleId: number
  createdAt: string
  updatedAt: string
  role: {
    id: number
    name: string
  }
  permissions: {
    id: number
    name: string
  }[]
  teams: {
    id: number
    name: string
  }[]
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
