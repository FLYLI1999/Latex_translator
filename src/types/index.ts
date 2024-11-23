export interface LLMProvider {
  name: string;
  apiUrl: string;
  apiKey: string;
  model: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description?: string | null;
  content: string;
  tags: string[];
  is_built_in: boolean;
  display_order?: number;
}

export interface TranslationSettings {
  maxConcurrentRequests: number;
  systemPrompt: string;
  provider: LLMProvider;
  renderLatex: boolean;
  autoTranslate: boolean;
  chunkSize: number;
  delayBetweenChunks: number;
  defaultSourceLang: string;
  defaultTargetLang: string;
  temperature: number;
  defaultApiUrl: string;
  downloadFilePrefix: string;
  templates: PromptTemplate[];
  selected_template_id?: string;
}

export interface SettingsState {
  isOpen: boolean;
  activeTab: 'provider' | 'prompt' | 'other';
}

export interface Variable {
  name: string;
  description: string;
  example: string;
}

export type SupportedLanguage = 'en' | 'zh' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru';

export interface SelectOption {
  value: string;
  label: string;
}