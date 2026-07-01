/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type { CreateArticleFormData, Article, ApiResponse } from "@/lib/validations/articles"

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
