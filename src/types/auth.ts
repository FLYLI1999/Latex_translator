import { z } from 'zod';

export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: registerSchema.shape.password,
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (credentials: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordInput) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}