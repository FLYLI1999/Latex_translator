import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import useStore from '../store';
import { toast } from 'react-toastify';
import Select from './common/Select';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { darkMode } = useStore();

  const handleLanguageChange = async (newLang: string) => {
    try {
      if (window.confirm(t('common.languageChange.confirm'))) {
        toast.info(t('common.languageChange.pending'));
        await i18n.changeLanguage(newLang);
      }
    } catch (error) {
      toast.error(t('errors.i18nChangeFailed'));
    }
  };

  const languageOptions = [
    { value: 'en', label: t('common.english') },
    { value: 'zh', label: t('common.chinese') },
    { value: 'ja', label: t('common.japanese') },
    { value: 'ko', label: t('common.korean') },
    { value: 'fr', label: t('common.french') },
    { value: 'de', label: t('common.german') },
    { value: 'es', label: t('common.spanish') },
    { value: 'ru', label: t('common.russian') }
  ];

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      options={languageOptions}
      icon={<Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
    />
  );
};

export default LanguageSwitch;
