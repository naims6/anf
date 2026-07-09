/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type {
  CreateArticleFormData,
  UpdateArticleFormData,
  Article,
  ArticleDetail,
  ApiResponse,
  ApiPaginatedResponse,
} from "@/lib/validations/articles"

export async function createArticle(data: CreateArticleFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.post<ApiResponse<Article>>(
      "/article/create",
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create article" }
  }
}

export async function getMyArticles(params: { page: number; limit: number; searchTerm?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const queryParams: Record<string, string> = {
      page: String(params.page),
      limit: String(params.limit),
    }
    if (params.searchTerm) queryParams.searchTerm = params.searchTerm

    const res = await apiClient.get<ApiPaginatedResponse<Article[]>>(
      "/article/my-articles",
      {
        params: queryParams,
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    return { data: res.data, pagination: res.pagination }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch articles" }
  }
}

export async function getArticleById(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.get<ApiResponse<ArticleDetail>>(
      `/article/get/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch article" }
  }
}

export async function updateArticle(id: string, data: UpdateArticleFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.patch<ApiResponse<ArticleDetail>>(
      `/article/update/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to update article" }
  }
}

export async function deleteArticle(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    await apiClient.delete(`/article/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete article" }
  }
}
