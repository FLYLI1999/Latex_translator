import React from 'react';
import useStore from '../../store';
import { Settings2, Zap, Clock, Split, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Select from '../common/Select';

const OtherTab: React.FC = () => {
  const { settings, updateSettings, clearRenderError } = useStore();
  const { t } = useTranslation();

  const handleChange = (field: keyof typeof settings, value: any) => {
    if (field === 'renderLatex') {
      clearRenderError();
    }
    updateSettings({
      ...settings,
      [field]: value,
    });
  };

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

  return (
    <div className="space-y-6">
      {/* 并发请求设置 */}
      <div className="flex items-start space-x-3">
        <Settings2 className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.other.maxRequests')}
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.maxConcurrentRequests}
            onChange={(e) => handleChange('maxConcurrentRequests', parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.other.maxRequestsDesc')}
          </p>
        </div>
      </div>

      {/* LaTeX渲染开关 */}
      <div className="flex items-start space-x-3">
        <Zap className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.other.renderLatex')}
            </label>
            <button
              onClick={() => handleChange('renderLatex', !settings.renderLatex)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                settings.renderLatex 
                  ? 'bg-indigo-600 dark:bg-indigo-500' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-gray-200 ${
                  settings.renderLatex ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.other.renderLatexDesc')}
          </p>
        </div>
      </div>

      {/* 自动翻译开关 */}
      <div className="flex items-start space-x-3">
        <Clock className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.other.autoTranslate')}
            </label>
            <button
              onClick={() => handleChange('autoTranslate', !settings.autoTranslate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                settings.autoTranslate 
                  ? 'bg-indigo-600 dark:bg-indigo-500' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-gray-200 ${
                  settings.autoTranslate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.other.autoTranslateDesc')}
          </p>
        </div>
      </div>

      {/* 分块设置 */}
      <div className="flex items-start space-x-3">
        <Split className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.other.chunkSize')}
            </label>
            <input
              type="number"
              min="100"
              max="50000"
              step="100"
              value={settings.chunkSize}
              onChange={(e) => handleChange('chunkSize', parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.other.chunkDelay')}
            </label>
            <input
              type="number"
              min="0"
              max="500000"
              step="1000"
              value={settings.delayBetweenChunks}
              onChange={(e) => handleChange('delayBetweenChunks', parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* 默认语言设置 */}
      <div className="flex items-start space-x-3">
        <Languages className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1 space-y-4">
          <Select
            value={settings.defaultSourceLang}
            onChange={(value) => handleChange('defaultSourceLang', value)}
            options={languageOptions}
            label={t('settings.other.defaultSourceLang')}
            className="mt-1"
          />
          <Select
            value={settings.defaultTargetLang}
            onChange={(value) => handleChange('defaultTargetLang', value)}
            options={languageOptions}
            label={t('settings.other.defaultTargetLang')}
            className="mt-1"
          />
        </div>
      </div>

      {/* temperature 设置 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.other.temperature')}
        </label>
        <input
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={settings.temperature}
          onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
};

export default OtherTab;