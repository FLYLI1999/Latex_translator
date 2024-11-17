import React, { useState, useRef } from 'react';
import useStore from '../../store';
import { useTranslation } from 'react-i18next';
import { Plus, Search } from 'lucide-react';
import { PromptTemplate, Variable } from '../../types';
import { toast } from 'react-toastify';
import TagInput from './TagInput';
import TemplateCard from './TemplateCard';

const VARIABLES: Variable[] = [
  { name: '{sourceLang}', description: 'Source language', example: 'English' },
  { name: '{targetLang}', description: 'Target language', example: 'Chinese' },
];

const BUILT_IN_TEMPLATES: PromptTemplate[] = [
  {
    id: 'default',
    name: 'Default Translator',
    description: 'Standard LaTeX translation template',
    content: 'You are a LaTeX document translator. Translate the following LaTeX content from {sourceLang} to {targetLang}.',
    tags: ['general', 'latex'],
    isBuiltIn: true,
    order: 0,
  },
  {
    id: 'academic',
    name: 'Academic Papers',
    description: 'Specialized for academic paper translation',
    content: 'You are an academic paper translator specializing in LaTeX documents. Translate from {sourceLang} to {targetLang} while maintaining academic terminology.',
    tags: ['academic', 'research'],
    isBuiltIn: true,
    order: 1,
  },
];

const PromptTab: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const [draggedItem, setDraggedItem] = useState<PromptTemplate | null>(null);
  const dragOverItemRef = useRef<string | null>(null);

  const templates = [...BUILT_IN_TEMPLATES, ...(settings.templates || [])];

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTemplateSelect = (template: PromptTemplate) => {
    updateSettings({
      ...settings,
      systemPrompt: template.content,
      selectedTemplateId: template.id,
    });
  };

  const handleVariableInsert = (variable: Variable) => {
    const textarea = document.getElementById('promptEditor') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + variable.name + text.substring(end);
      updateSettings({
        ...settings,
        systemPrompt: newText,
      });
      setSelectedVariable(null);
    }
  };

  const handleDragStart = (template: PromptTemplate) => {
    if (!template.isBuiltIn) {
      setDraggedItem(template);
    }
  };

  const handleDragOver = (e: React.DragEvent, templateId: string) => {
    e.preventDefault();
    dragOverItemRef.current = templateId;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !dragOverItemRef.current) return;

    const items = Array.from(filteredTemplates);
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const dropIndex = items.findIndex(item => item.id === dragOverItemRef.current);

    if (draggedIndex === -1 || dropIndex === -1) return;

    items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, draggedItem);

    const updatedTemplates = items
      .filter(item => !item.isBuiltIn)
      .map((item, index) => ({
        ...item,
        order: index,
      }));

    updateSettings({
      ...settings,
      templates: updatedTemplates,
    });

    setDraggedItem(null);
    dragOverItemRef.current = null;
  };

  const handleTemplateDelete = (templateId: string) => {
    if (window.confirm(t('settings.prompt.confirmDelete'))) {
      const updatedTemplates = (settings.templates || []).filter(t => t.id !== templateId);
      updateSettings({
        ...settings,
        templates: updatedTemplates,
      });
      toast.success(t('success.templateDeleted'));
    }
  };

  const handleTemplateEdit = (template: PromptTemplate) => {
    setEditingTemplate({
      ...template,
      tags: Array.isArray(template.tags) ? [...template.tags] : [],
    });
    setIsEditing(true);
  };

  const handleNewTemplate = () => {
    setEditingTemplate({
      id: `template-${Date.now()}`,
      name: '',
      description: '',
      content: '',
      tags: [],
      order: (settings.templates || []).length,
    });
    setIsEditing(true);
  };

  const handleTemplateSave = () => {
    if (!editingTemplate) return;

    if (!editingTemplate.name.trim()) {
      toast.error(t('errors.templateNameRequired'));
      return;
    }

    if (!editingTemplate.content.trim()) {
      toast.error(t('errors.templateContentRequired'));
      return;
    }

    const currentTemplates = settings.templates || [];
    
    const templateToSave = {
      ...editingTemplate,
      tags: Array.isArray(editingTemplate.tags) ? [...editingTemplate.tags] : [],
    };
    
    let updatedTemplates;
    const existingTemplateIndex = currentTemplates.findIndex(t => t.id === templateToSave.id);
    
    if (existingTemplateIndex !== -1) {
      updatedTemplates = currentTemplates.map(t => 
        t.id === templateToSave.id ? templateToSave : t
      );
    } else {
      updatedTemplates = [...currentTemplates, {
        ...templateToSave,
        order: currentTemplates.length
      }];
    }

    const newSettings = {
      ...settings,
      templates: updatedTemplates,
    };

    if (settings.selectedTemplateId === templateToSave.id) {
      newSettings.systemPrompt = templateToSave.content;
    }

    updateSettings(newSettings);
    toast.success(t('success.templateSaved'));
    setIsEditing(false);
    setEditingTemplate(null);
  };

  const handleTemplateVariableInsert = (variable: Variable) => {
    if (!editingTemplate) return;
    
    const textarea = document.getElementById('templateContentEditor') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + variable.name + text.substring(end);
      setEditingTemplate({
        ...editingTemplate,
        content: newText,
      });
    }
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

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {filteredTemplates
            .sort((a, b) => {
              if (a.isBuiltIn && !b.isBuiltIn) return -1;
              if (!a.isBuiltIn && b.isBuiltIn) return 1;
              return (a.order || 0) - (b.order || 0);
            })
            .map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={settings.selectedTemplateId === template.id}
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

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-10rem)]">
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
