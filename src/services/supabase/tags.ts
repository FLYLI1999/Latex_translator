import { supabase } from '../../config/supabase-auth';
import type { Database } from '../../types/supabase';

type UserTag = Database['public']['Tables']['user_tags']['Row'];
type UserTagInsert = Database['public']['Tables']['user_tags']['Insert'];
type UserTagUpdate = Database['public']['Tables']['user_tags']['Update'];

export const tagService = {
  // 获取用户标签
  async getTags(userId: string) {
    const { data, error } = await supabase
      .from('user_tags')
      .select('*')
      .eq('user_id', userId)
      .order('name');
      
    if (error) throw error;
    return data;
  },

  // 创建标签
  async createTag(tag: UserTagInsert) {
    const { data, error } = await supabase
      .from('user_tags')
      .insert(tag)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // 更新标签
  async updateTag(id: string, tag: UserTagUpdate) {
    const { data, error } = await supabase
      .from('user_tags')
      .update(tag)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  // 删除标签
  async deleteTag(id: string) {
    const { error } = await supabase
      .from('user_tags')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};