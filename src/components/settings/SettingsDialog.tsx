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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl h-[90vh] rounded-2xl bg-white shadow-2xl dark:bg-gray-800 flex flex-col">
        <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200/10 p-6">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            {t('common.settings')}
          </h2>
          <button
            onClick={closeSettings}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-shrink-0 border-b border-gray-200/10 px-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => useStore.setState({ settingsState: { ...settingsState, activeTab: tab.id } })}
                className={`relative py-4 text-sm font-medium transition-colors ${
                  settingsState.activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {settingsState.activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
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