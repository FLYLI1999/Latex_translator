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
    <div className="h-[calc(100vh-16rem)] lg:h-[calc(100vh-12rem)] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none p-4 sm:p-6">
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