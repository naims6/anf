import api from "./axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: number;
  teamId: number;
  isActive: boolean;
  permissions?: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    user?: User;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  roleId: number;
  teamId: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post("/admin/user-login", credentials);
    return data;
  },

  async logout(): Promise<AuthResponse> {
    const { data } = await api.post("/admin/user-logout");
    return data;
  },

  async getMe(): Promise<{ success: boolean; data: { user: User } }> {
    const { data } = await api.get("/admin/me");
    return data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const { data } = await api.post("/admin/refresh-token");
    return data;
  },

  async changePassword(payload: ChangePasswordData): Promise<AuthResponse> {
    const { data } = await api.post("/admin/change-password", payload);
    return data;
  },

  async createUser(payload: CreateUserData): Promise<AuthResponse> {
    const { data } = await api.post("/admin/create-admin-user", payload);
    return data;
  },
};
