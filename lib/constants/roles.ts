import type { Permission, Role } from "@/lib/validations/roles"

export const permissions: Permission[] = [
  { id: 1, name: "Create Article" },
  { id: 2, name: "Edit Article" },
  { id: 3, name: "Delete Article" },
  { id: 4, name: "View Article" },
  { id: 5, name: "Manage Users" },
  { id: 6, name: "Manage Roles" },
  { id: 7, name: "Manage Permissions" },
  { id: 8, name: "View Reports" },
]

export const initialRoles: Role[] = [
  {
    name: "Article Writer",
    description: "This role is for article writers who can create and edit articles.",
    permissionIds: [1, 2, 4, 6, 8],
  },
  {
    name: "Editor",
    description: "Editors can manage all content and moderate submissions.",
    permissionIds: [1, 2, 3, 4, 8],
  },
  {
    name: "Admin",
    description: "Full access to all features and settings.",
    permissionIds: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    name: "Viewer",
    description: "Read-only access to articles and reports.",
    permissionIds: [4, 8],
  },
]
