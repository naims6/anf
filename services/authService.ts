import api from "./axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  roleId: number;
  role: {
    name: string;
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type LoginData = {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    email: string;
    name: string;
  };
};

export const authService = {
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<LoginData>> {
    const { data } = await api.post("/admin/user-login", credentials);
    return data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const { data } = await api.post("/admin/user-logout");
    return data;
  },

  async getMe(): Promise<ApiResponse<User>> {
    const { data } = await api.get("/admin/me");
    return data;
  },

  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const { data } = await api.post("/admin/refresh-token");
    return data;
  },

  async changePassword(
    payload: ChangePasswordData,
  ): Promise<ApiResponse<unknown>> {
    const { data } = await api.post("/admin/change-password", payload);
    return data;
  },

  async createUser(
    payload: CreateUserData,
  ): Promise<ApiResponse<unknown>> {
    const { data } = await api.post("/admin/create-admin-user", payload);
    return data;
  },
};
