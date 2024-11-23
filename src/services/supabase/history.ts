import { supabase } from '../../config/supabase-auth';
import type { Database } from '../../types/supabase';

type History = Database['public']['Tables']['translation_history']['Row'];
type HistoryInsert = Database['public']['Tables']['translation_history']['Insert'];
type HistoryUpdate = Database['public']['Tables']['translation_history']['Update'];

export const historyService = {
  // 获取翻译历史
  async getHistory(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('translation_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  },

  // 添加翻译记录
  async addHistory(history: HistoryInsert) {
    const { data, error } = await supabase
      .from('translation_history')
      .insert(history)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // 更新收藏状态
  async toggleFavorite(id: string, isFavorite: boolean) {
    const { data, error } = await supabase
      .from('translation_history')
      .update({ is_favorite: isFavorite })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};