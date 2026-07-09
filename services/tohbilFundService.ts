/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type { TohbilFund } from "@/lib/validations/tohbilFund"

interface TohbilFundListResponse {
  success: boolean
  message: string
  data: TohbilFund[]
}

interface TohbilFundSingleResponse {
  success: boolean
  message: string
  data: TohbilFund
}

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value
}

export async function getAllTohbilFunds(params?: {
  searchTerm?: string
  status?: string
}) {
  try {
    const token = await getAuthToken()
    const queryParams: Record<string, string> = {}
    if (params) {
      if (params.searchTerm) queryParams.searchTerm = params.searchTerm
      if (params.status) queryParams.status = params.status
    }
    const res = await apiClient.get<TohbilFundListResponse>("/tohbil", {
      headers: { Authorization: `Bearer ${token}` },
      params: queryParams,
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch funds" }
  }
}

export async function getActiveTohbilFunds() {
  try {
    const res = await apiClient.get<TohbilFundListResponse>("/tohbil", {
      params: { status: "active" },
    })
    return { data: res.data || [] }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch funds" }
  }
}

export async function createTohbilFund(data: {
  name: string
  nameBN: string
}) {
  try {
    const token = await getAuthToken()
    const res = await apiClient.post<TohbilFundSingleResponse>(
      "/tohbil/create",
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create fund" }
  }
}

export async function updateTohbilFund(
  id: string,
  data: { name: string; nameBN: string },
) {
  try {
    const token = await getAuthToken()
    const res = await apiClient.patch<TohbilFundSingleResponse>(
      `/tohbil/update/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to update fund" }
  }
}

export async function deleteTohbilFund(id: string) {
  try {
    const token = await getAuthToken()
    await apiClient.delete<{ success: boolean; message: string }>(
      `/tohbil/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete fund" }
  }
}

export async function toggleTohbilFundStatus(id: string) {
  try {
    const token = await getAuthToken()
    const res = await apiClient.patch<TohbilFundSingleResponse>(
      `/tohbil/${id}/toggle-status`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    )
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to toggle status" }
  }
}
