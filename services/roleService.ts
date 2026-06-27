/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type { RoleFormData, Role, Permission, ApiResponse } from "@/lib/validations/roles"

export async function getAllRoles() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.get<ApiResponse<Role[]>>("/role/get-all", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch roles" }
  }
}

export async function createRole(data: RoleFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.post<ApiResponse<Role>>("/role/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create role" }
  }
}

export async function updateRole(roleId: number, data: RoleFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.patch<ApiResponse<Role>>(`/role/update/${roleId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to update role" }
  }
}

export async function deleteRole(roleId: number) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    await apiClient.delete(`/role/delete/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete role" }
  }
}

export async function getAllPermissions() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.get<ApiResponse<Permission[]>>("/permission/get-all", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch permissions" }
  }
}

export async function getRolePermissions(roleId: number) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.get<ApiResponse<Permission[]>>(
      `/role/get-role-permissions/${roleId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch permissions" }
  }
}
