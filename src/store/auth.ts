import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { AuthStore, LoginInput, RegisterInput, ResetPasswordInput, User } from '../types/auth';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      login: async (credentials: LoginInput) => {
        try {
          set({ isLoading: true });
          const { data } = await api.post('/login', credentials);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });
          toast.success('Successfully logged in');
        } catch (error) {
          toast.error('Invalid credentials');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data: RegisterInput) => {
        try {
          set({ isLoading: true });
          await api.post('/register', data);
          toast.success('Registration successful. Please check your email to verify your account.');
        } catch (error) {
          toast.error('Registration failed');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await api.post('/logout');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          toast.success('Successfully logged out');
        } catch (error) {
          toast.error('Logout failed');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ isLoading: true });
          await api.post('/forgot-password', { email });
          toast.success('Password reset instructions sent to your email');
        } catch (error) {
          toast.error('Failed to send reset instructions');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (data: ResetPasswordInput) => {
        try {
          set({ isLoading: true });
          await api.post('/reset-password', data);
          toast.success('Password successfully reset');
        } catch (error) {
          toast.error('Failed to reset password');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      verifyEmail: async (token: string) => {
        try {
          set({ isLoading: true });
          const { data } = await api.post('/verify-email', { token });
          set({
            user: data.user,
            isAuthenticated: true,
          });
          toast.success('Email successfully verified');
        } catch (error) {
          toast.error('Failed to verify email');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Axios interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor for handling 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default useAuthStore;