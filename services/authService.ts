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
