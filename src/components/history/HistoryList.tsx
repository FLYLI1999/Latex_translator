import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ArrowRight, Trash2, Clock } from 'lucide-react';
import { useHistoryStore } from '../../store/history';
import useStore from '../../store';
import { formatDistanceToNow } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

interface HistoryListProps {
  searchQuery: string;
  showFavorites: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({ searchQuery, showFavorites }) => {
  const { t, i18n } = useTranslation();
  const { history, toggleFavorite, deleteHistory } = useHistoryStore();
  const { setSourceText, setTranslatedText, sourceLang, targetLang, setSourceLang, setTargetLang } = useStore();

  const dateLocale = i18n.language === 'zh' ? zhCN : enUS;

  const filteredHistory = history
    .filter(item => {
      const matchesSearch = !searchQuery || 
        item.source_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translated_text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorite = !showFavorites || item.is_favorite;
      return matchesSearch && matchesFavorite;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleRestore = (item: typeof history[0]) => {
    setSourceText(item.source_text);
    setTranslatedText(item.translated_text);
    setSourceLang(item.source_lang);
    setTargetLang(item.target_lang);
  };

  return (
    <div className="space-y-4">
      {filteredHistory.map(item => (
        <div 
          key={item.id}
          className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(item.id, !item.is_favorite)}
                className={`rounded-full p-1 transition-colors ${
                  item.is_favorite
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <Star className="h-4 w-4 fill-current" />
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(item.created_at), { 
                  addSuffix: true,
                  locale: dateLocale 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRestore(item)}
                className="rounded-md px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
              >
                {t('history.restore')}
              </button>
              <button
                onClick={() => deleteHistory(item.id)}
                className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t(`common.${item.source_lang}`)}
              </div>
              <div className="text-sm text-gray-900 dark:text-white line-clamp-3">
                {item.source_text}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t(`common.${item.target_lang}`)}
              </div>
              <div className="text-sm text-gray-900 dark:text-white line-clamp-3">
                {item.translated_text}
              </div>
            </div>
          </div>
        </div>
      ))}

      {filteredHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <Clock className="h-12 w-12 mb-4" />
          <p>{showFavorites ? t('history.noFavorites') : t('history.noHistory')}</p>
        </div>
      )}
    </div>
  );
};

export default HistoryList;