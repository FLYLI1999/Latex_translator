import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Copy, Edit2, Trash2, GripVertical } from 'lucide-react';
import { PromptTemplate } from '../../types';

interface TemplateCardProps {
  template: PromptTemplate;
  isSelected: boolean;
  onEdit: (template: PromptTemplate) => void;
  onDelete: (templateId: string) => void;
  onSelect: (template: PromptTemplate) => void;
  onDragStart?: (e: React.DragEvent, template: PromptTemplate) => void;
  onDragOver?: (e: React.DragEvent, templateId: string) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onEdit,
  onDelete,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const { t } = useTranslation();

  return (
    <div
      draggable={!template.isBuiltIn}
      onDragStart={(e) => onDragStart?.(e, template)}
      onDragOver={(e) => onDragOver?.(e, template.id)}
      onDrop={onDrop}
      className={`rounded-lg border p-3 sm:p-4 transition-colors ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900'
          : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {!template.isBuiltIn && (
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move flex-shrink-0" />
              )}
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {template.name}
              </h4>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          </div>
          <div className="flex flex-shrink-0 space-x-2">
            <button
              onClick={() => onSelect(template)}
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              title={t('common.select')}
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
            {!template.isBuiltIn && (
              <>
                <button
                  onClick={() => onEdit(template)}
                  className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={t('common.edit')}
                >
                  <Edit2 className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={t('common.delete')}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </>
            )}
          </div>
        </div>
        {template.tags && template.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {template.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
