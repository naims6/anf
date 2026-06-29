/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { apiClient } from "@/lib/api-client"
import type { TeamFormData, Team, ApiResponse, TeamQueryParams } from "@/lib/validations/teams"
import type { Role } from "@/lib/validations/roles"

export async function getAllTeams(params?: TeamQueryParams) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const queryParams: Record<string, string> = {}
    if (params) {
      if (params.page !== undefined) queryParams.page = String(params.page)
      if (params.limit !== undefined) queryParams.limit = String(params.limit)
      if (params.searchTerm) queryParams.searchTerm = params.searchTerm
    }
    const res = await apiClient.get<ApiResponse<Team[]>>("/team", {
      headers: { Authorization: `Bearer ${token}` },
      params: queryParams,
    })
    return { data: res.data, pagination: res.pagination }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch teams" }
  }
}

export async function createTeam(data: TeamFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.post<ApiResponse<Team>>("/team/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to create team" }
  }
}

export async function updateTeam(teamId: number, data: TeamFormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    const res = await apiClient.patch<ApiResponse<Team>>(`/team/update/${teamId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { data: res.data }
  } catch (error: any) {
    return { error: error.message || "Failed to update team" }
  }
}

export async function deleteTeam(teamId: number) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value
    await apiClient.delete(`/team/delete/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete team" }
  }
}

export async function getAllRolesForTeam() {
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
