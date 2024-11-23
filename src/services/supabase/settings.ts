import { supabase } from '../../config/supabase-auth';
import type { Database } from '../../types/supabase';
import { withRetry } from '../../utils/supabase-helper';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];
type UserSettingsInsert = Database['public']['Tables']['user_settings']['Insert'];
type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

export const settingsService = {
  // 获取用户设置
  async getUserSettings(userId: string) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (error) {
        console.error('获取设置失败:', error);
        throw error;
      }
      return data;
    }, {
      maxRetries: 3,
      initialDelay: 1000
    });
  },

  // 创建用户设置
  async createUserSettings(settings: UserSettingsInsert) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .insert(settings)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    });
  },

  // 更新用户设置
  async updateUserSettings(userId: string, settings: UserSettingsUpdate) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .update(settings)
        .eq('user_id', userId)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    });
  }
};