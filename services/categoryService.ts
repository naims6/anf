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

export async function getCategoryAncestors(leafId: string): Promise<{ data?: { id: string; name: string }[]; error?: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const headers = { Authorization: `Bearer ${token}` }

    async function fetchChildren(parentId?: string): Promise<Category[]> {
      const params: Record<string, string> = {}
      if (parentId) params.parentId = parentId
      const res = await apiClient.get<ApiResponse<Category[]>>("/category", {
        headers, params,
      })
      return res.data || []
    }

    // Build flat map of all categories by traversing the tree
    const map = new Map<string, { id: string; name: string; parentId: string | null }>()
    async function traverse(parentId?: string) {
      const children = await fetchChildren(parentId)
      for (const cat of children) {
        map.set(cat.id, { id: cat.id, name: cat.name, parentId: cat.parentId ?? null })
        if ((cat._count?.childCategories ?? 0) > 0) {
          await traverse(cat.id)
        }
      }
    }

    await traverse()

    // Walk up from leaf to root
    const path: { id: string; name: string }[] = []
    let currentId: string | null = leafId
    while (currentId) {
      const entry = map.get(currentId)
      if (!entry) break
      path.unshift({ id: entry.id, name: entry.name })
      currentId = entry.parentId
    }

    return { data: path }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch category ancestors" }
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
