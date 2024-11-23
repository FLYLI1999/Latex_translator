import React, { useEffect } from 'react';
import { Languages, Sun, Moon, Play, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Select from './common/Select';
import { useSettingsStore } from '../store/settings';
import { useTemplateStore } from '../store/templates';
import useStore from '../store';

const Toolbar: React.FC = () => {
  const { settings } = useSettingsStore();
  const { templates, selectedTemplate, selectTemplate } = useTemplateStore();
  const { 
    darkMode, 
    toggleDarkMode,
    sourceLang,
    targetLang,
    setSourceLang,
    setTargetLang,
    translate,
    isTranslating,
    translationProgress
  } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (settings?.translation_settings) {
      setSourceLang(settings.translation_settings.defaultSourceLang);
      setTargetLang(settings.translation_settings.defaultTargetLang);
    }
  }, [settings?.translation_settings]);

  const languageOptions = [
    { value: 'en', label: t('common.english') },
    { value: 'zh', label: t('common.chinese') },
    { value: 'ja', label: t('common.japanese') },
    { value: 'ko', label: t('common.korean') },
    { value: 'fr', label: t('common.french') },
    { value: 'de', label: t('common.german') },
    { value: 'es', label: t('common.spanish') },
    { value: 'ru', label: t('common.russian') }
  ];

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2 min-w-0">
          <Languages className="h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            options={languageOptions}
            disabled={isTranslating}
            className="w-full sm:w-32"
          />
          <button
            onClick={swapLanguages}
            disabled={isTranslating}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
            title={t('common.swapLanguages')}
          >
            <ArrowLeftRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            options={languageOptions}
            disabled={isTranslating}
            className="w-full sm:w-32"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end space-x-4">
        <button 
          onClick={translate}
          disabled={isTranslating}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isTranslating 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Play className={`h-4 w-4 ${isTranslating ? 'animate-spin' : ''}`} />
          <span>
            {isTranslating 
              ? `${t('common.translating')} ${translationProgress}%` 
              : t('common.translate')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;