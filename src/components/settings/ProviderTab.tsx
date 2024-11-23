import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { DEFAULT_SETTINGS, ApiSettings, TranslationSettings } from '../../constants/defaultSettings';
import type { Database } from '../../types/supabase';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];
type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

interface ProviderTabProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettingsUpdate) => Promise<void>;
}

const ProviderTab: React.FC<ProviderTabProps> = ({ settings, onUpdate }) => {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState<ApiSettings>({
    ...DEFAULT_SETTINGS.api_settings,
    ...settings.api_settings,
  });
  const [newModel, setNewModel] = useState({ id: '', name: '' });
  const [showAddModel, setShowAddModel] = useState(false);

  const handleApiSettingsChange = (field: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddModel = () => {
    if (!newModel.id || !newModel.name) return;
    
    setLocalSettings(prev => ({
      ...prev,
      models: [...prev.models, { ...newModel, isBuiltIn: false }]
    }));
    setNewModel({ id: '', name: '' });
    setShowAddModel(false);
  };

  const handleRemoveModel = (modelId: string) => {
    setLocalSettings(prev => ({
      ...prev,
      models: prev.models.filter(m => m.id !== modelId)
    }));
  };

  const handleApply = async () => {
    await onUpdate({
      api_settings: localSettings
    });
  };

  const handleReset = () => {
    setLocalSettings({
      ...DEFAULT_SETTINGS.api_settings as ApiSettings
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.provider.apiKey')}
          </label>
          <input
            type="password"
            value={localSettings.apiKey}
            onChange={(e) => handleApiSettingsChange('apiKey', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.provider.apiUrl')}
          </label>
          <input
            type="text"
            value={localSettings.apiUrl}
            onChange={(e) => handleApiSettingsChange('apiUrl', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.provider.models')}
            </label>
            <button
              onClick={() => setShowAddModel(true)}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t('common.add')}
            </button>
          </div>
          
          <select
            value={localSettings.model}
            onChange={(e) => handleApiSettingsChange('model', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {localSettings.models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <div className="mt-2 space-y-2">
            {localSettings.models.filter(m => !m.isBuiltIn).map(model => (
              <div key={model.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {model.name} ({model.id})
                </span>
                <button
                  onClick={() => handleRemoveModel(model.id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModel && (
        <div className="mt-4 space-y-3 p-4 border rounded-lg dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.provider.modelId')}
            </label>
            <input
              type="text"
              value={newModel.id}
              onChange={(e) => setNewModel(prev => ({ ...prev, id: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('settings.provider.modelName')}
            </label>
            <input
              type="text"
              value={newModel.name}
              onChange={(e) => setNewModel(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowAddModel(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-500"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleAddModel}
              className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-500"
            >
              {t('common.add')}
            </button>
          </div>
        </div>
      )}

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

export default ProviderTab;