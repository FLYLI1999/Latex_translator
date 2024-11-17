import React from 'react';
import useStore from '../store';
import LatexRenderer from './LatexRenderer';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Preview: React.FC = () => {
  const { translatedText, renderError, settings } = useStore();
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
    <div className="h-[calc(100vh-16rem)] overflow-auto p-4">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {translatedText ? (
          settings.renderLatex ? (
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
  );
};

export default Preview;