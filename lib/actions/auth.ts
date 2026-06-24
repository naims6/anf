"use server";

import { cookies } from "next/headers";
import { loginSchema, LoginCredentials } from "@/lib/validations/auth";
import { userService } from "@/services/authService";

export async function loginAction(credentials: LoginCredentials) {
  // 1. Validate inputs on the server side
  const validated = loginSchema.safeParse(credentials);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Invalid input data",
    };
  }

  try {
    // 2. Call the backend API service
    const response = await userService.login(validated.data);
    const { accessToken, refreshToken, userInfo } = response.data;

    // 3. Store tokens and user details in secure, HTTP-only cookies
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day expiration
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    });

    cookieStore.set("user", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day expiration
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
      // Attempt to call the backend logout endpoint to invalidate the session there
      try {
        await userService.logout({
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
    // Always clear the cookies, even if the backend call fails
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
