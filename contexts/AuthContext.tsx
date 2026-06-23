"use client";

import { createContext, useState, type ReactNode } from "react";
import {
  authService,
  type User,
  type LoginCredentials,
  type ChangePasswordData,
  type CreateUserData,
} from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (payload: ChangePasswordData) => Promise<void>;
  createUser: (payload: CreateUserData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    const { userInfo } = res.data;
    console.log({ res });

    setUser({
      id: "",
      email: userInfo.email,
      name: userInfo.name,
      phone: null,
      roleId: 0,
      role: { name: "" },
    });

    try {
      const profile = await authService.getMe();
      if (profile.success) {
        setUser(profile.data);
      }
    } catch {
      // keep partial user if getMe fails
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const changePassword = async (payload: ChangePasswordData) => {
    const res = await authService.changePassword(payload);
    if (!res.success) {
      throw new Error(res.message || "Change password failed");
    }
  };

  const createUser = async (payload: CreateUserData) => {
    const res = await authService.createUser(payload);
    if (!res.success) {
      throw new Error(res.message || "Create user failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        changePassword,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
