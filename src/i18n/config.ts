import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { toast } from 'react-toastify';
import en from './locales/en';
import zh from './locales/zh';

const SUPPORTED_LANGUAGES = ['en', 'zh'];
const FALLBACK_LANG = 'en';

// 语言检测配置
const detectionOptions = {
  order: ['querystring', 'localStorage', 'navigator'],
  lookupQuerystring: 'lang',
  caches: ['localStorage'],
  cookieMinutes: 10080,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, zh: { translation: zh } },
    fallbackLng: FALLBACK_LANG,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: detectionOptions,
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
  })
  .catch(err => {
    console.error('i18n initialization failed:', err);
    toast.error(i18n.t('errors.i18nInitFailed'));
  });

// 语言变更监听器
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
  
  // 使用 toast 显示语言切换状态
  if (i18n.isInitialized) {
    toast.success(i18n.t('common.languageChange.success'));
  }
});

export default i18n;
