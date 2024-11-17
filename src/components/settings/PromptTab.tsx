import React from 'react';
import useStore from '../../store';
import { useTranslation } from 'react-i18next';

const PromptTab: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.prompt.systemPrompt')}
        </label>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.prompt.variables')}
        </div>
        <textarea
          value={settings.systemPrompt}
          onChange={(e) =>
            updateSettings({ ...settings, systemPrompt: e.target.value })
          }
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder={t('settings.prompt.placeholder')}
        />
      </div>
    </div>
  );
};

export default PromptTab;