import React, { useState, useRef } from 'react';
import { useTemplateStore } from '../../store/templates';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { PromptTemplate, Variable } from '../../types';
import { toast } from 'react-toastify';
import TagInput from './TagInput';
import TemplateCard from './TemplateCard';
import type { Database } from '../../types/supabase';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];
type UserSettingsUpdate = Database['public']['Tables']['user_settings']['Update'];

const VARIABLES: Variable[] = [
  { name: '{sourceLang}', description: 'Source language', example: 'English' },
  { name: '{targetLang}', description: 'Target language', example: 'Chinese' },
];

interface PromptTabProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettingsUpdate) => Promise<void>;
}

const PromptTab: React.FC<PromptTabProps> = ({ settings, onUpdate }) => {
  const { t } = useTranslation();
  const { templates, createTemplate, updateTemplate, deleteTemplate } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const [draggedItem, setDraggedItem] = useState<PromptTemplate | null>(null);
  const dragOverItemRef = useRef<string | null>(null);

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  const handleTemplateSelect = async (template: PromptTemplate) => {
    try {
      await onUpdate({
        selected_template_id: template.id
      });
    } catch (error) {
      toast.error(t('errors.updateSettingsFailed'));
    }
  };

  const handleTemplateSave = async () => {
    if (!editingTemplate) return;

    if (!editingTemplate.name.trim()) {
      toast.error(t('errors.templateNameRequired'));
      return;
    }

    try {
      if (editingTemplate.id.startsWith('template-')) {
        // 新模板
        await createTemplate({
          name: editingTemplate.name,
          description: editingTemplate.description || '',
          content: editingTemplate.content,
          tags: editingTemplate.tags,
          display_order: templates.length
        });
      } else {
        // 更新现有模板
        await updateTemplate(editingTemplate.id, {
          name: editingTemplate.name,
          description: editingTemplate.description || '',
          content: editingTemplate.content,
          tags: editingTemplate.tags
        });
      }
      setIsEditing(false);
      setEditingTemplate(null);
    } catch (error) {
      toast.error(t('errors.saveTemplateFailed'));
    }
  };

  const handleTemplateDelete = async (templateId: string) => {
    if (!window.confirm(t('settings.prompt.confirmDelete'))) return;
    
    try {
      await deleteTemplate(templateId);
      if (settings.selected_template_id === templateId) {
        await onUpdate({ selected_template_id: null });
      }
    } catch (error) {
      toast.error(t('errors.deleteTemplateFailed'));
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !dragOverItemRef.current) return;

    if (draggedItem.is_built_in) {
      toast.error(t('errors.cannotReorderBuiltIn'));
      return;
    }

    const items = Array.from(filteredTemplates);
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const dropIndex = items.findIndex(item => item.id === dragOverItemRef.current);

    if (draggedIndex === -1 || dropIndex === -1) return;

    try {
      await updateTemplate(draggedItem.id, {
        display_order: dropIndex
      });
      
      setDraggedItem(null);
      dragOverItemRef.current = null;
    } catch (error) {
      toast.error(t('errors.updateOrderFailed'));
    }
  };

  const handleNewTemplate = () => {
    setEditingTemplate({
      id: `template-${Date.now()}`,
      name: '',
      description: '',
      content: '',
      tags: [],
      is_built_in: false
    });
    setIsEditing(true);
  };

  const handleTemplateEdit = (template: PromptTemplate) => {
    setEditingTemplate(template);
    setIsEditing(true);
  };

  const handleTemplateVariableInsert = (variable: Variable) => {
    const editor = document.getElementById('templateContentEditor') as HTMLTextAreaElement;
    if (!editor) return;
    
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const content = editor.value;
    const newContent = content.substring(0, start) + variable.name + content.substring(end);
    
    setEditingTemplate({
      ...editingTemplate!,
      content: newContent
    });
  };

  const handleDragStart = (template: PromptTemplate) => {
    setDraggedItem(template);
  };

  const handleDragOver = (e: React.DragEvent, templateId: string) => {
    e.preventDefault();
    dragOverItemRef.current = templateId;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('settings.prompt.searchTemplates')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={handleNewTemplate}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('settings.prompt.newTemplate')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {filteredTemplates
            .sort((a, b) => {
              if (a.is_built_in && !b.is_built_in) return -1;
              if (!a.is_built_in && b.is_built_in) return 1;
              return (a.display_order || 0) - (b.display_order || 0);
            })
            .map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={settings.selected_template_id === template.id}
                onEdit={handleTemplateEdit}
                onDelete={() => handleTemplateDelete(template.id)}
                onSelect={handleTemplateSelect}
                onDragStart={(e, template) => handleDragStart(template)}
                onDragOver={(e, templateId) => handleDragOver(e, templateId)}
                onDrop={handleDrop}
              />
            ))}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg flex flex-col mx-4">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {editingTemplate?.id 
                  ? t('settings.prompt.editTemplate')
                  : t('settings.prompt.newTemplate')}
              </h3>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-10rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.prompt.templateName')}
                  </label>
                  <input
                    type="text"
                    value={editingTemplate?.name || ''}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate!,
                        name: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.prompt.templateDescription')}
                  </label>
                  <textarea
                    value={editingTemplate?.description || ''}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate!,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.prompt.tags')}
                  </label>
                  <TagInput
                    tags={editingTemplate?.tags || []}
                    onChange={(tags) =>
                      setEditingTemplate({
                        ...editingTemplate!,
                        tags,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.prompt.templateContent')}
                  </label>
                  <textarea
                    id="templateContentEditor"
                    value={editingTemplate?.content || ''}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate!,
                        content: e.target.value,
                      })
                    }
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('settings.prompt.variables')}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {VARIABLES.map((variable) => (
                        <button
                          key={variable.name}
                          onClick={() => handleTemplateVariableInsert(variable)}
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          {variable.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingTemplate(null);
                  }}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleTemplateSave}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {t('common.save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptTab;
