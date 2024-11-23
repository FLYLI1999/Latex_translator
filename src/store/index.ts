import { create } from 'zustand';
import { translateText } from '../services/api';
import { toast } from 'react-toastify';
import i18n from '../i18n/config';
import { useSettingsStore } from './settings';
import { useTemplateStore } from './templates';
import { useHistoryStore } from './history';

const getT = () => i18n.t.bind(i18n);

interface TranslationStore {
  // UI 状态
  darkMode: boolean;
  isSettingsOpen: boolean;
  toggleDarkMode: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  
  // 翻译状态
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  setTranslatedText: (text: string) => void;
  sourceLang: string;
  setSourceLang: (lang: string) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
  
  // 错误处理
  renderError: string | null;
  setRenderError: (error: string) => void;
  clearRenderError: () => void;
  
  // 翻译进度
  isTranslating: boolean;
  translationProgress: number;
  setTranslationProgress: (progress: number) => void;
  
  // 核心功能
  translate: () => Promise<void>;
  uploadFile: () => Promise<void>;
  downloadFile: () => void;
  saveFile: () => void;
  copyToClipboard: () => void;
  
  // 国际化
  i18n: {
    currentLanguage: string;
    isChangingLanguage: boolean;
  };
  setLanguage: (lang: string) => Promise<void>;
}

const useStore = create<TranslationStore>((set, get) => ({
  // UI 状态
  darkMode: false,
  isSettingsOpen: false,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  
  // 翻译状态
  sourceText: '',
  setSourceText: (text: string) => set({ sourceText: text }),
  translatedText: '',
  setTranslatedText: (text: string) => set({ translatedText: text }),
  sourceLang: 'zh',
  setSourceLang: (lang: string) => set({ sourceLang: lang }),
  targetLang: 'en',
  setTargetLang: (lang: string) => set({ targetLang: lang }),
  
  // 错误处理
  renderError: null,
  setRenderError: (error: string) => set({ renderError: error }),
  clearRenderError: () => set({ renderError: null }),
  
  // 翻译状态
  isTranslating: false,
  translationProgress: 0,
  setTranslationProgress: (progress: number) => set({ translationProgress: progress }),
  
  // 核心功能
  translate: async () => {
    const t = getT();
    const { sourceText, sourceLang, targetLang } = get();
    const settings = useSettingsStore.getState().settings;
    
    if (!sourceText.trim()) {
      toast.error(t('errors.emptyContent'));
      return;
    }

    if (!settings?.api_settings.apiKey || !settings?.api_settings.apiUrl) {
      toast.error(t('errors.apiConfigRequired'));
      return;
    }

    set({ isTranslating: true, translationProgress: 0 });

    try {
      const lines = sourceText.split('\n').filter(line => line.trim());
      const chunks: string[] = [];
      let currentChunk = '';

      for (const line of lines) {
        if (currentChunk.length + line.length > settings.translation_settings.chunkSize) {
          chunks.push(currentChunk);
          currentChunk = line;
        } else {
          currentChunk += (currentChunk ? '\n' : '') + line;
        }
      }
      if (currentChunk) chunks.push(currentChunk);

      const results: string[] = [];
      for (let i = 0; i < chunks.length; i++) {
        if (i >= settings.translation_settings.maxConcurrentRequests) {
          await new Promise(resolve => 
            setTimeout(resolve, Math.floor(i / settings.translation_settings.maxConcurrentRequests) * settings.translation_settings.delayBetweenChunks)
          );
        }
        const result = await translateText({
          text: chunks[i],
          sourceLang,
          targetLang,
          settings: {
            ...settings.translation_settings,
            provider: settings.api_settings
          },
        });
        results.push(result);
        set({ translationProgress: Math.round(((i + 1) / chunks.length) * 100) });
      }

      const translatedText = results.join('\n');
      set({ translatedText });
      
      // 保存翻译历史
      await useHistoryStore.getState().addHistory({
        source_text: sourceText,
        translated_text: translatedText,
        source_lang: sourceLang,
        target_lang: targetLang,
        template_id: useTemplateStore.getState().selectedTemplate?.id
      });

      toast.success(t('success.translateSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.translateFailed'));
    } finally {
      set({ isTranslating: false, translationProgress: 0 });
    }
  },

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
    const { translatedText } = get();
    const settings = useSettingsStore.getState().settings;
    
    if (!translatedText.trim()) {
      toast.error(t('errors.downloadFailed'));
      return;
    }

    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${settings?.translation_settings.downloadFilePrefix || 'translated_'}${new Date().getTime()}.tex`;
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
    // 实现保存功能
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

  // 国际化
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