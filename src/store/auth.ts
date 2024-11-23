import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase-auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User | null) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user || null });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;