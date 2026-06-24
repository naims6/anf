// import api from "./axios";

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   phone: string | null;
//   roleId: number;
//   role: {
//     name: string;
//   };
// }

// export interface ChangePasswordData {
//   currentPassword: string;
//   newPassword: string;
// }

// export interface CreateUserData {
//   email: string;
//   name: string;
//   password: string;
//   roleId: number;
//   teamId: number;
// }

// export const authService = {
//   async login(
//     credentials: LoginCredentials,
//   ) {
//     const { data } = await api.post("/admin/user-login", credentials);
//     return data;
//   },

//   async logout() {
//     const { data } = await api.post("/admin/user-logout");
//     return data;
//   },

//   async getMe() {
//     const { data } = await api.get("/admin/me");
//     return data;
//   },

//   async refreshToken() {
//     const { data } = await api.post("/admin/refresh-token");
//     return data;
//   },

//   async changePassword(
//     payload: ChangePasswordData,
//   ) {
//     const { data } = await api.post("/admin/change-password", payload);
//     return data;
//   },

//   async createUser(
//     payload: CreateUserData,
//   ) {
//     const { data } = await api.post("/admin/create-admin-user", payload);
//     return data;
//   },
// };

import { apiClient } from "@/lib/api-client";
import {
  LoginCredentials,
  AuthResponse,
  CreateUserPayload,
  CurrentUser,
  ChangePasswordPayload,
} from "@/lib/validations/auth";

export const userService = {
  // Public Endpoint: Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/admin/user-login", credentials);
  },

  // Refresh Token
  refreshToken: async (): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/admin/refresh-token");
  },

  // Logout
  logout: async (options?: any): Promise<void> => {
    return apiClient.post<void>("/admin/user-logout", undefined, options);
  },

  // Protected Endpoint: Get current user details
  // Passing an optional explicit token/config here allows Server Components to pass headers manually!
  getMe: async (options?: any): Promise<CurrentUser> => {
    return apiClient.get<CurrentUser>("/admin/me", options);
  },

  // Protected Endpoint: Create an Admin User
  createAdminUser: async (
    userData: CreateUserPayload,
  ): Promise<CurrentUser> => {
    return apiClient.post<CurrentUser>("/admin/create-admin-user", userData);
  },

  // Protected Endpoint: Change Password
  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>(
      "/admin/change-password",
      payload,
    );
  },
};
