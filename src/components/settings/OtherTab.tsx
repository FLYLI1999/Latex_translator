import React, { useState } from 'react';
import { Settings2, Zap, Clock, Split, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Select from '../common/Select';
import { DEFAULT_SETTINGS, ApiSettings, TranslationSettings } from '../../constants/defaultSettings';
import type { Database } from '../../types/supabase';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];
type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

interface OtherTabProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettingsUpdate) => Promise<void>;
}

const OtherTab: React.FC<OtherTabProps> = ({ settings, onUpdate }) => {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState<TranslationSettings>({
    ...DEFAULT_SETTINGS.translation_settings,
    ...settings.translation_settings,
  });

  const handleTranslationSettingsChange = (field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = async () => {
    await onUpdate({
      translation_settings: localSettings
    });
  };

  const handleReset = () => {
    setLocalSettings({
      ...DEFAULT_SETTINGS.translation_settings as TranslationSettings
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
            value={localSettings.maxConcurrentRequests}
            onChange={(e) => handleTranslationSettingsChange('maxConcurrentRequests', parseInt(e.target.value, 10))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
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
              onClick={() => handleTranslationSettingsChange('renderLatex', !localSettings.renderLatex)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                localSettings.renderLatex 
                  ? 'bg-indigo-600 dark:bg-indigo-500' 
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-gray-200 ${
                localSettings.renderLatex ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* 默认语言设置 */}
      <div className="flex items-start space-x-3">
        <Languages className="mt-1 h-5 w-5 text-gray-400" />
        <div className="flex-1 space-y-4">
          <Select
            value={localSettings.defaultSourceLang}
            onChange={(value) => handleTranslationSettingsChange('defaultSourceLang', value)}
            options={languageOptions}
            label={t('settings.other.defaultSourceLang')}
            className="mt-1"
          />
          <Select
            value={localSettings.defaultTargetLang}
            onChange={(value) => handleTranslationSettingsChange('defaultTargetLang', value)}
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
          value={localSettings.temperature}
          onChange={(e) => handleTranslationSettingsChange('temperature', parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Apply 和 Reset 按钮 */}
      <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          {t('common.reset')}
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          {t('common.apply')}
        </button>
      </div>
    </div>
  );
};

export default OtherTab;