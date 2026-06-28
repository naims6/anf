/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type { User, Role, PaginationMeta } from "@/lib/validations/users"

export async function getAllUsers(params?: {
  page?: number
  limit?: number
  searchTerm?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const queryParams: Record<string, string> = {}
    if (params) {
      if (params.page !== undefined) queryParams.page = String(params.page)
      if (params.limit !== undefined) queryParams.limit = String(params.limit)
      if (params.searchTerm) queryParams.searchTerm = params.searchTerm
    }
    const res = await apiClient.get<{
      success: boolean
      message: string
      data: User[]
      pagination: PaginationMeta
    }>("/user/get-all", {
      headers: { Authorization: `Bearer ${token}` },
      params: queryParams,
    })
    return { data: res.data, pagination: res.pagination }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch users" }
  }
}

export async function getAllRolesForUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.get<{
      success: boolean
      message: string
      data: Role[]
    }>("/role/get-all-list", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch roles" }
  }
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  teamId: number
  roleId: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.post<{
      success: boolean
      message: string
      data: User
    }>("/admin/create-admin-user", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create user" }
  }
}
