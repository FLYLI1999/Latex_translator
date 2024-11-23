import { supabase } from '../../config/supabase-auth';
import type { Database } from '../../types/supabase';
import { withRetry } from '../../utils/supabase-helper';

type Template = Database['public']['Tables']['translation_templates']['Row'];
type TemplateInsert = Database['public']['Tables']['translation_templates']['Insert'];
type TemplateUpdate = Database['public']['Tables']['translation_templates']['Update'];

export const templateService = {
  // 获取用户模板列表
  async getTemplates(userId: string) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('translation_templates')
        .select('id, name, content, tags, is_built_in, display_order')
        .or(`user_id.eq.${userId},is_built_in.eq.true`)
        .order('display_order', { ascending: true })
        .limit(50);
        
      if (error) throw error;
      return data;
    });
  },

  // 创建模板
  async createTemplate(template: TemplateInsert) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('translation_templates')
        .insert(template)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    });
  },

  // 更新模板
  async updateTemplate(id: string, template: TemplateUpdate) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('translation_templates')
        .update(template)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    });
  },

  // 删除模板 
  async deleteTemplate(id: string) {
    return withRetry(async () => {
      const { error } = await supabase
        .from('translation_templates')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    });
  }
};