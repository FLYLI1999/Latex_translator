import { create } from 'zustand';
import { translateText } from './services/api';
import { toast } from 'react-toastify';
import { LLMProvider, TranslationSettings, SettingsState, PromptTemplate } from './types';
import i18n from './i18n/config';

// Default system prompt
const DEFAULT_SYSTEM_PROMPT = `You are a LaTeX document translator. Translate the following LaTeX content from {sourceLang} to {targetLang}.
Preserve all LaTeX commands and structure. Only translate the actual text content.
Maintain the exact same formatting, spacing, and LaTeX syntax.
If you find any syntax errors in the original LaTeX content, please point them out and suggest corrections, but do not modify them during translation.`;

const getT = () => i18n.t.bind(i18n);

const defaultProvider: LLMProvider = {
  name: 'OpenAI',
  apiUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-3.5-turbo',
};

const defaultSettings: TranslationSettings = {
  maxConcurrentRequests: 5,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  provider: defaultProvider,
  renderLatex: false,
  autoTranslate: false,
  chunkSize: 5000,
  delayBetweenChunks: 500,
  defaultSourceLang: 'zh',
  defaultTargetLang: 'en',
  temperature: 0.3,
  defaultApiUrl: 'https://api.openai.com/v1',
  downloadFilePrefix: 'translated_',
  templates: [],
  selectedTemplateId: 'default',
};

interface Store {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  setTranslatedText: (text: string) => void;
  sourceLang: string;
  setSourceLang: (lang: string) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
  renderError: string | null;
  setRenderError: (error: string) => void;
  clearRenderError: () => void;
  isTranslating: boolean;
  translate: () => Promise<void>;
  settings: TranslationSettings;
  updateSettings: (settings: TranslationSettings) => void;
  settingsState: SettingsState;
  openSettings: () => void;
  closeSettings: () => void;
  uploadFile: () => Promise<void>;
  downloadFile: () => void;
  saveFile: () => void;
  copyToClipboard: () => void;
  i18n: {
    currentLanguage: string;
    isChangingLanguage: boolean;
  };
  setLanguage: (lang: string) => Promise<void>;
}

const useStore = create<Store>((set, get) => ({
  darkMode: false,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  
  sourceText: '',
  setSourceText: (text: string) => set({ sourceText: text }),
  
  translatedText: '',
  setTranslatedText: (text: string) => set({ translatedText: text }),
  
  sourceLang: defaultSettings.defaultSourceLang,
  setSourceLang: (lang: string) => set({ sourceLang: lang }),
  
  targetLang: defaultSettings.defaultTargetLang,
  setTargetLang: (lang: string) => set({ targetLang: lang }),
  
  renderError: null,
  setRenderError: (error: string) => set({ renderError: error }),
  clearRenderError: () => set({ renderError: null }),
  
  isTranslating: false,
  
  translate: async () => {
    const t = getT();
    const { sourceText, sourceLang, targetLang, settings } = get();
    
    if (!sourceText.trim()) {
      toast.error(t('errors.emptyContent'));
      return;
    }

    if (!settings.provider.apiKey || !settings.provider.apiUrl) {
      toast.error(t('errors.apiConfigRequired'));
      return;
    }

    set({ isTranslating: true });

    try {
      const lines = sourceText.split('\n').filter(line => line.trim());
      const chunks: string[] = [];
      let currentChunk = '';

      for (const line of lines) {
        if (currentChunk.length + line.length > settings.chunkSize) {
          chunks.push(currentChunk);
          currentChunk = line;
        } else {
          currentChunk += (currentChunk ? '\n' : '') + line;
        }
      }
      if (currentChunk) chunks.push(currentChunk);

      const results = await Promise.all(
        chunks.map(async (chunk, index) => {
          if (index >= settings.maxConcurrentRequests) {
            await new Promise(resolve => 
              setTimeout(resolve, Math.floor(index / settings.maxConcurrentRequests) * settings.delayBetweenChunks)
            );
          }
          return translateText({
            text: chunk,
            sourceLang,
            targetLang,
            settings,
          });
        })
      );

      set({ translatedText: results.join('\n') });
      toast.success(t('success.translateSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.translateFailed'));
    } finally {
      set({ isTranslating: false });
    }
  },

  settings: defaultSettings,
  updateSettings: (newSettings: TranslationSettings) => set({ settings: newSettings }),

  settingsState: {
    isOpen: false,
    activeTab: 'provider'
  },
  openSettings: () => set({ settingsState: { isOpen: true, activeTab: 'provider' } }),
  closeSettings: () => set({ settingsState: { isOpen: false, activeTab: 'provider' } }),

  uploadFile: async () => {
    const t = getT();
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.tex,.txt';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const text = await file.text();
        set({ sourceText: text });
        toast.success(t('success.uploadSuccess'));
      };

      input.click();
    } catch (error) {
      toast.error(t('errors.uploadFailed'));
    }
  },

  downloadFile: () => {
    const t = getT();
    const { translatedText, settings } = get();
    
    if (!translatedText.trim()) {
      toast.error(t('errors.downloadFailed'));
      return;
    }

    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${settings.downloadFilePrefix}${new Date().getTime()}.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  saveFile: () => {
    const t = getT();
    const { translatedText } = get();
    
    if (!translatedText.trim()) {
      toast.error(t('errors.saveFailed'));
      return;
    }
    // Implement save functionality
  },

  copyToClipboard: () => {
    const t = getT();
    const { translatedText } = get();
    
    if (!translatedText.trim()) {
      toast.error(t('errors.noContentToCopy'));
      return;
    }

    navigator.clipboard.writeText(translatedText)
      .then(() => toast.success(t('success.copySuccess')))
      .catch(() => toast.error(t('errors.copyFailed')));
  },

  i18n: {
    currentLanguage: i18n.language,
    isChangingLanguage: false,
  },

  setLanguage: async (lang: string) => {
    const t = getT();
    try {
      set(state => ({ i18n: { ...state.i18n, isChangingLanguage: true } }));
      await i18n.changeLanguage(lang);
      set({ i18n: { currentLanguage: lang, isChangingLanguage: false } });
    } catch (error) {
      set(state => ({ i18n: { ...state.i18n, isChangingLanguage: false } }));
      toast.error(t('errors.i18nChangeFailed'));
      throw error;
    }
  },
}));

export default useStore;