import React from 'react';
import useStore from '../store/index';
import LatexRenderer from './LatexRenderer';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/settings';

const Preview: React.FC = () => {
  const { translatedText, renderError } = useStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation();

  if (renderError) {
    return (
      <div className="flex h-[calc(100vh-16rem)] items-center justify-center text-red-500">
        <AlertCircle className="mr-2 h-5 w-5" />
        <span>{t('errors.renderError')}: {renderError}</span>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
      <div className="h-full overflow-auto p-6">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {translatedText ? (
            settings?.translation_settings?.renderLatex ? (
              <LatexRenderer content={translatedText} />
            ) : (
              <div className="whitespace-pre-wrap">{translatedText}</div>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              {t('common.translatedText')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;