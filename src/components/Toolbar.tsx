import React, { useEffect } from 'react';
import { Languages, Sun, Moon, Play } from 'lucide-react';
import useStore from '../store';
import { useTranslation } from 'react-i18next';
import Select from './common/Select';

const Toolbar: React.FC = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    sourceLang, 
    targetLang, 
    setSourceLang, 
    setTargetLang,
    translate,
    isTranslating,
    settings
  } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    setSourceLang(settings.defaultSourceLang);
    setTargetLang(settings.defaultTargetLang);
  }, [settings.defaultSourceLang, settings.defaultTargetLang]);

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            options={[
              { value: 'en', label: t('common.english') },
              { value: 'zh', label: t('common.chinese') }
            ]}
            disabled={isTranslating}
            className="w-24"
          />
          <span className="text-gray-500 dark:text-gray-400">→</span>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            options={[
              { value: 'zh', label: t('common.chinese') },
              { value: 'en', label: t('common.english') }
            ]}
            disabled={isTranslating}
          />
        </div>
        <button 
          onClick={translate}
          disabled={isTranslating}
          className={`inline-flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isTranslating 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Play className={`h-4 w-4 ${isTranslating ? 'animate-spin' : ''}`} />
          <span>{t(isTranslating ? 'common.translating' : 'common.translate')}</span>
        </button>
      </div>
      <button
        onClick={toggleDarkMode}
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Toolbar;