import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settings';
import { useAuthStore } from '../../store/auth';
import { useTemplateStore } from '../../store/templates';
import { useHistoryStore } from '../../store/history';
import ProviderTab from './ProviderTab';
import PromptTab from './PromptTab';
import OtherTab from './OtherTab';
import useStore from '../../store/index';

const SettingsDialog: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { settings, isLoading: settingsLoading, fetchSettings, updateSettings } = useSettingsStore();
  const { templates, fetchTemplates } = useTemplateStore();
  const { fetchHistory } = useHistoryStore();
  const { closeSettings } = useStore();
  const [activeTab, setActiveTab] = useState<'provider' | 'prompt' | 'other'>('provider');

  useEffect(() => {
    if (user) {
      fetchSettings();
      fetchTemplates().then(() => {
        if (!settings?.selected_template_id && templates.length > 0) {
          updateSettings({
            selected_template_id: templates[0].id
          });
        }
      });
      fetchHistory();
    }
  }, [user]);

  if (!settings) return null;

  const tabs = [
    { id: 'provider', label: t('settings.provider.title') },
    { id: 'prompt', label: t('settings.prompt.title') },
    { id: 'other', label: t('settings.other.title') },
  ] as const;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSettings();
        }
      }}
    >
      <div className="w-full max-w-3xl h-[90vh] rounded-2xl bg-white shadow-2xl dark:bg-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">{t('common.settings')}</h2>
          <button
            onClick={closeSettings}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label={t('common.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 px-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'provider' && (
            <ProviderTab settings={settings} onUpdate={updateSettings} />
          )}
          {activeTab === 'prompt' && (
            <PromptTab 
              settings={settings} 
              onUpdate={updateSettings}
            />
          )}
          {activeTab === 'other' && (
            <OtherTab settings={settings} onUpdate={updateSettings} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
