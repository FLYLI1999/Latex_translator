import React from 'react';
import useStore from '../../store';
import { useTranslation } from 'react-i18next';

const ProviderTab: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { provider } = settings;
  const { t } = useTranslation();

  const handleProviderChange = (field: keyof typeof provider, value: string) => {
    updateSettings({
      ...settings,
      provider: { ...provider, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.provider.name')}
        </label>
        <input
          type="text"
          value={provider.name}
          onChange={(e) => handleProviderChange('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.provider.apiUrl')}
        </label>
        <input
          type="text"
          value={provider.apiUrl}
          onChange={(e) => handleProviderChange('apiUrl', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="https://api.example.com/v1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.provider.apiKey')}
        </label>
        <input
          type="password"
          value={provider.apiKey}
          onChange={(e) => handleProviderChange('apiKey', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('settings.provider.model')}
        </label>
        <input
          type="text"
          value={provider.model}
          onChange={(e) => handleProviderChange('model', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="gpt-3.5-turbo"
        />
      </div>
    </div>
  );
};

export default ProviderTab;