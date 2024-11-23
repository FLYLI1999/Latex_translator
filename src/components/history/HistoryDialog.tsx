import React from 'react';
import { X, Clock, Star, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHistoryStore } from '../../store/history';
import useStore from '../../store';
import HistoryList from './HistoryList';

interface HistoryDialogProps {
  onClose: () => void;
}

const HistoryDialog: React.FC<HistoryDialogProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { darkMode } = useStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFavorites, setShowFavorites] = React.useState(false);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-4xl h-[90vh] rounded-2xl bg-white shadow-2xl dark:bg-gray-800 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('history.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 工具栏 */}
        <div className="flex items-center space-x-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('history.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
              showFavorites 
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>{t('history.favorites')}</span>
          </button>
        </div>

        {/* 历史记录列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          <HistoryList 
            searchQuery={searchQuery}
            showFavorites={showFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryDialog;