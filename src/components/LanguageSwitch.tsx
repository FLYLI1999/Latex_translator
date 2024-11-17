import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
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

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      options={[
        { value: 'en', label: t('common.english') },
        { value: 'zh', label: t('common.chinese') }
      ]}
      icon={<Languages className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
    />
  );
};

export default LanguageSwitch;
