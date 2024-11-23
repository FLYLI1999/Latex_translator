import { create } from 'zustand';
import { settingsService } from '../services/supabase/settings';
import { toast } from 'react-toastify';
import type { Database } from '../types/supabase';
import useAuthStore from './auth';
import { handleSupabaseError } from '../utils/supabase-helper';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];
type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

interface SettingsStore {
  settings: UserSettings | null;
  isLoading: boolean;
  error: Error | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: UserSettingsUpdate) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    const user = useAuthStore.getState().user;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    
    if (!user || !isAuthenticated || window.location.pathname === '/auth') {
      return;
    }

    if (get().settings !== null && !get().error) {
      return;
    }

    if (get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      let settings = await settingsService.getUserSettings(user.id);
      
      if (!settings) {
        const defaultSettings = {
          id: 'temp',
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          display_name: DEFAULT_SETTINGS.display_name,
          interface_language: DEFAULT_SETTINGS.interface_language,
          theme: DEFAULT_SETTINGS.theme,
          api_settings: DEFAULT_SETTINGS.api_settings as Database['public']['Tables']['user_settings']['Row']['api_settings'],
          translation_settings: DEFAULT_SETTINGS.translation_settings as Database['public']['Tables']['user_settings']['Row']['translation_settings'],
          selected_template_id: DEFAULT_SETTINGS.selected_template_id
        };
        
        try {
          settings = await settingsService.createUserSettings(defaultSettings);
        } catch (createError) {
          console.error('创建默认设置失败:', createError);
          settings = {
            ...defaultSettings
          };
        }
      }
      
      set({ settings, error: null });
    } catch (error) {
      console.error('获取设置失败:', error);
      const defaultSettings = {
        id: 'temp',
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        display_name: DEFAULT_SETTINGS.display_name,
        interface_language: DEFAULT_SETTINGS.interface_language,
        theme: DEFAULT_SETTINGS.theme,
        api_settings: DEFAULT_SETTINGS.api_settings as Database['public']['Tables']['user_settings']['Row']['api_settings'],
        translation_settings: DEFAULT_SETTINGS.translation_settings as Database['public']['Tables']['user_settings']['Row']['translation_settings'],
        selected_template_id: DEFAULT_SETTINGS.selected_template_id
      };
      set({ 
        settings: defaultSettings,
        error: error as Error 
      });
      handleSupabaseError(error as Error, '加载设置失败，使用默认设置');
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (newSettings) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const updated = await settingsService.updateUserSettings(user.id, newSettings);
      set(state => ({
        settings: state.settings ? {
          ...state.settings,
          ...updated
        } : updated
      }));
      toast.success('设置已更新');
    } catch (error) {
      set({ error: error as Error });
      toast.error('更新设置失败');
    } finally {
      set({ isLoading: false });
    }
  }
}));