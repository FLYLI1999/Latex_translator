import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase-auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ 
        user: session?.user || null,
        isAuthenticated: !!session?.user
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;