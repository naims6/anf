/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import {
  LoginCredentials,
  AuthResponse,
  CreateUserPayload,
  CurrentUser,
  ChangePasswordPayload,
  loginSchema,
} from "@/lib/validations/auth";

async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/admin/user-login", credentials);
}

async function refreshToken(): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/admin/refresh-token");
}

async function logout(options?: any): Promise<void> {
  return apiClient.post<void>("/admin/user-logout", undefined, options);
}

async function getMe(options?: any): Promise<CurrentUser> {
  return apiClient.get<CurrentUser>("/admin/me", options);
}

async function createAdminUser(
  userData: CreateUserPayload,
): Promise<CurrentUser> {
  return apiClient.post<CurrentUser>("/admin/create-admin-user", userData);
}

async function changePassword(
  payload: ChangePasswordPayload,
): Promise<{ message: string }> {
  return apiClient.post<{ message: string }>("/admin/change-password", payload);
}

// actions for login,logout,getsession

export async function loginAction(credentials: LoginCredentials) {
  try {
    const response = await login(credentials);
    const {
      accessToken,
      refreshToken: newRefreshToken,
      userInfo,
    } = response.data;

    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("user", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: error.message || "Failed to login. Please check your credentials.",
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (token) {
      try {
        await logout({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("Backend logout error:", err);
      }
    }
  } catch (err) {
    console.error("Logout action error:", err);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("user");
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;
    const token = cookieStore.get("access_token")?.value;

    if (!token || !userCookie) {
      return null;
    }

    return {
      user: JSON.parse(userCookie),
      token,
    };
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}
