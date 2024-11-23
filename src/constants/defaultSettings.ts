import type { Database } from '../types/supabase';

type UserSettingsInsert = Database['public']['Tables']['user_settings']['Insert'];

interface ApiSettings {
  provider: string;
  apiKey: string;
  apiUrl: string;
  model: string;
  models: Array<{
    id: string;
    name: string;
    isBuiltIn?: boolean;
  }>;
}

interface TranslationSettings {
  maxConcurrentRequests: number;
  chunkSize: number;
  delayBetweenChunks: number;
  defaultSourceLang: string;
  defaultTargetLang: string;
  temperature: number;
  renderLatex: boolean;
}
export const DEFAULT_SETTINGS: Required<Omit<UserSettingsInsert, 'user_id' | 'id'>> = {
  display_name: null,
  interface_language: 'en', 
  theme: 'light',
  api_settings: {
    provider: 'openai',
    apiKey: '',
    apiUrl: '',
    model: 'gpt-3.5-turbo',
    models: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', isBuiltIn: true },
      { id: 'gpt-4', name: 'GPT-4', isBuiltIn: true },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', isBuiltIn: true }
    ]
  } as ApiSettings,
  translation_settings: {
    maxConcurrentRequests: 3,
    chunkSize: 2000,
    delayBetweenChunks: 300,
    defaultSourceLang: 'en',
    defaultTargetLang: 'zh',
    temperature: 0.3,
    renderLatex: false
  } as TranslationSettings,
  selected_template_id: null
};

export type { ApiSettings, TranslationSettings };