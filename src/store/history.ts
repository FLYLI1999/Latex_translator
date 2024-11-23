import { create } from 'zustand';
import { historyService } from '../services/supabase/history';
import { toast } from 'react-toastify';
import type { Database } from '../types/supabase';
import useAuthStore from './auth';
import { handleSupabaseError } from '../utils/supabase-helper';

type History = Database['public']['Tables']['translation_history']['Row'];
type HistoryInsert = Database['public']['Tables']['translation_history']['Insert'];

interface HistoryStore {
  history: History[];
  isLoading: boolean;
  error: Error | null;
  fetchHistory: (limit?: number) => Promise<void>;
  addHistory: (history: Omit<HistoryInsert, 'user_id'>) => Promise<void>;
  toggleFavorite: (id: string, isFavorite: boolean) => Promise<void>;
  deleteHistory: (id: string) => Promise<void>;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  isLoading: false,
  error: null,

  fetchHistory: async (limit = 50) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const history = await historyService.getHistory(user.id, limit);
      set({ history });
    } catch (error) {
      set({ error: error as Error });
      handleSupabaseError(error as Error, '加载历史记录失败');
    } finally {
      set({ isLoading: false });
    }
  },

  addHistory: async (history) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const newHistory = await historyService.addHistory({
        ...history,
        user_id: user.id
      });
      set(state => ({ 
        history: [newHistory, ...state.history]
      }));
    } catch (error) {
      set({ error: error as Error });
      handleSupabaseError(error as Error, '保存历史记录失败');
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (id, isFavorite) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await historyService.toggleFavorite(id, isFavorite);
      set(state => ({
        history: state.history.map(h => h.id === id ? updated : h)
      }));
    } catch (error) {
      set({ error: error as Error });
      handleSupabaseError(error as Error, '更新收藏状态失败');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteHistory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await historyService.deleteHistory(id);
      set(state => ({
        history: state.history.filter(h => h.id !== id)
      }));
      toast.success('已删除历史记录');
    } catch (error) {
      set({ error: error as Error });
      handleSupabaseError(error as Error, '删除历史记录失败');
    } finally {
      set({ isLoading: false });
    }
  }
}));