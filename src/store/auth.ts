import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Successfully signed in');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Check your email to confirm your account');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset instructions');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user || null });
});

export default useAuthStore;