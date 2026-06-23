"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
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
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (payload: ChangePasswordData) => Promise<void>;
  createUser: (payload: CreateUserData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await authService.getMe();
      if (res.success) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);

    if (!res.success) {
      throw new Error(res.message || "Login failed");
    }

    const { userInfo } = res.data;

    const partialUser: User = {
      id: "",
      email: userInfo.email,
      name: userInfo.name,
      phone: null,
      roleId: 0,
      role: { name: "" },
    };

    setUser(partialUser);

    try {
      const profile = await authService.getMe();
      if (profile.success) {
        setUser(profile.data);
      }
    } catch {
      // keep partial user if getMe fails
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const changePassword = useCallback(async (payload: ChangePasswordData) => {
    const res = await authService.changePassword(payload);
    if (!res.success) {
      throw new Error(res.message || "Change password failed");
    }
  }, []);

  const createUser = useCallback(async (payload: CreateUserData) => {
    const res = await authService.createUser(payload);
    if (!res.success) {
      throw new Error(res.message || "Create user failed");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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


