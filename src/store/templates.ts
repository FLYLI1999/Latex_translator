import { create } from 'zustand';
import { templateService } from '../services/supabase/templates';
import { toast } from 'react-toastify';
import type { Database } from '../types/supabase';
import useAuthStore from './auth';
import { handleSupabaseError } from '../utils/supabase-helper';

type Template = Database['public']['Tables']['translation_templates']['Row'];
type TemplateInsert = Database['public']['Tables']['translation_templates']['Insert'];
type TemplateUpdate = Database['public']['Tables']['translation_templates']['Update'];

interface TemplateStore {
  templates: Template[];
  selectedTemplate: Template | null;
  isLoading: boolean;
  error: Error | null;
  fetchTemplates: () => Promise<void>;
  createTemplate: (template: TemplateInsert) => Promise<void>;
  updateTemplate: (id: string, template: TemplateUpdate) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  selectTemplate: (id: string) => void;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  selectedTemplate: null,
  isLoading: false,
  error: null,

  fetchTemplates: async () => {
    const user = useAuthStore.getState().user;
    if (!user || window.location.pathname === '/auth') return;

    if (get().templates.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const templates = await templateService.getTemplates(user.id);
      set({ templates });
    } catch (error) {
      set({ error: error as Error });
      handleSupabaseError(error as Error, '加载模板失败');
    } finally {
      set({ isLoading: false });
    }
  },

  createTemplate: async (template) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const newTemplate = await templateService.createTemplate({
        ...template,
        user_id: user.id
      });
      set(state => ({ 
        templates: [...state.templates, newTemplate]
      }));
      toast.success('模板已创建');
    } catch (error) {
      set({ error: error as Error });
      toast.error('创建模板失败');
    } finally {
      set({ isLoading: false });
    }
  },

  updateTemplate: async (id, template) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await templateService.updateTemplate(id, template);
      set(state => ({
        templates: state.templates.map(t => t.id === id ? updated : t)
      }));
      toast.success('模板已更新');
    } catch (error) {
      set({ error: error as Error });
      toast.error('更新模板失败');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTemplate: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await templateService.deleteTemplate(id);
      set(state => ({
        templates: state.templates.filter(t => t.id !== id)
      }));
      toast.success('模板已删除');
    } catch (error) {
      set({ error: error as Error });
      toast.error('删除模板失败');
    } finally {
      set({ isLoading: false });
    }
  },

  selectTemplate: (id) => {
    set({ selectedTemplate: get().templates.find(t => t.id === id) });
  }
}));