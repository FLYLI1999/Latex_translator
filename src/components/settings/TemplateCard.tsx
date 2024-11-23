import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Check, Edit2, Trash2, GripVertical } from 'lucide-react';
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
      draggable={!template.is_built_in}
      onDragStart={(e) => !template.is_built_in && onDragStart?.(e, template)}
      onDragOver={(e) => onDragOver?.(e, template.id)}
      onDrop={onDrop}
      className={`group relative rounded-xl border transition-all duration-200 h-[200px] flex flex-col ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-400 dark:bg-indigo-900/30'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
      } ${
        template.is_built_in ? 'cursor-not-allowed opacity-75' : 'cursor-grab'
      }`}
    >
      <div className="flex-1 p-4 sm:p-5 overflow-hidden">
        <div className="flex items-start gap-3">
          {!template.is_built_in && (
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white truncate">
              {template.name}
            </h4>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          </div>
        </div>

        {template.tags && template.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {template.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-1 p-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
        <button
          onClick={() => onSelect(template)}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t('common.select')}
        >
          <div className={`p-0.5 rounded-full border transition-colors ${
            isSelected 
              ? 'border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400' 
              : 'border-current'
          }`}>
            <Check className="h-3 w-3" />
          </div>
        </button>
        {!template.is_built_in && (
          <>
            <button
              onClick={() => onEdit(template)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={t('common.edit')}
            >
              <Edit2 className="h-3 w-3" />
            </button>
            <button
              onClick={() => onDelete(template.id)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={t('common.delete')}
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
