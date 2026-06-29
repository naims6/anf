import z from "zod";

// ─── Validation Schemas ─────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "MANAGER"]),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// ─── Types ──────────────────────────────────────────────────────────────────

export type LoginCredentials = z.infer<typeof loginSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateUserPayload = z.infer<typeof createUserSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;

/** User info returned from the backend login endpoint */
export interface UserInfo {
  id: string;
  email: string;
  name: string;
}

/** Full user profile returned from /admin/me */
export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roleId: number;
  role: {
    name: string;
  };
}

/** Shape of the raw data field from the login API response */
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}

/** Wrapper shape from ApiResponse.success() */
export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Shape returned by the login API endpoint (wrapped in ApiSuccessResponse) */
export type AuthResponse = ApiSuccessResponse<LoginResponseData>;
