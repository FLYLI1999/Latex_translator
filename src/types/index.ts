export interface LLMProvider {
  name: string;
  apiUrl: string;
  apiKey: string;
  model: string;
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
}

export interface SettingsState {
  isOpen: boolean;
  activeTab: 'provider' | 'prompt' | 'other';
}