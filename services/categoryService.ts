/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type {
  CreateCategoryFormData,
  Category,
  ApiResponse,
} from "@/lib/validations/categories"

export async function getAllCategories(parentId?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const params: Record<string, string> = {}
    if (parentId) params.parentId = parentId
    const res = await apiClient.get<ApiResponse<Category[]>>("/category", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch categories" }
  }
}

export async function createCategory(data: CreateCategoryFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.post<ApiResponse<Category>>(
      "/category/create",
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create category" }
  }
}

export async function updateCategory(categoryId: string, data: CreateCategoryFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.patch<ApiResponse<Category>>(
      `/category/update/${categoryId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to update category" }
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    await apiClient.delete(`/category/delete/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete category" }
  }
}
