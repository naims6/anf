"use server"

import { apiClient } from "@/lib/api-client"

interface TohbilFund {
  id: string
  name: string
  nameBN: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface TohbilResponse {
  success: boolean
  message: string
  data: TohbilFund[]
}

export async function getActiveTohbilFunds() {
  try {
    const res = await apiClient.get<TohbilResponse>("/tohbil", {
      params: { status: "active" },
    })
    return { data: res.data || [] }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch funds" }
  }
}
