import React from 'react';
import { X } from 'lucide-react';
import useStore from '../../store';
import ProviderTab from './ProviderTab';
import PromptTab from './PromptTab';
import OtherTab from './OtherTab';
import { useTranslation } from 'react-i18next';

const SettingsDialog: React.FC = () => {
  const { settings, closeSettings, settingsState } = useStore();
  const { t } = useTranslation();

  if (!settingsState.isOpen) return null;

  const tabs = [
    { id: 'provider', label: t('settings.provider.title') },
    { id: 'prompt', label: t('settings.prompt.title') },
    { id: 'other', label: t('settings.other.title') },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl h-[90vh] rounded-lg bg-white shadow-xl dark:bg-gray-800 flex flex-col">
        <div className="flex-shrink-0 flex items-center justify-between border-b p-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('common.settings')}
          </h2>
          <button
            onClick={closeSettings}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0 border-b px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => useStore.setState({ settingsState: { ...settingsState, activeTab: tab.id } })}
                  className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                    settingsState.activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 overflow-hidden p-6">
            {settingsState.activeTab === 'provider' && <ProviderTab />}
            {settingsState.activeTab === 'prompt' && <PromptTab />}
            {settingsState.activeTab === 'other' && <OtherTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;