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
  name: string
  description: string
  permissionIds: number[]
}
