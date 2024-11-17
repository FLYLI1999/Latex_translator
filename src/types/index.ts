export interface LLMProvider {
  name: string;
  apiUrl: string;
  apiKey: string;
  model: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  tags: string[];
  isBuiltIn?: boolean;
  order?: number;
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
  selectedTemplateId?: string;
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