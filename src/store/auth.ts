import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase-auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const useAuthStore = create<AuthState>(() => ({
  user: null,
  isLoading: false,
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user || null });
});

export default useAuthStore;