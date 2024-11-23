import { useHistoryStore } from '../../store/history';

export const HistoryList = () => {
  const { history, fetchHistory, toggleFavorite } = useHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, []);

  // 处理收藏切换
  const handleFavoriteToggle = async (id: string, isFavorite: boolean) => {
    await toggleFavorite(id, isFavorite);
  };

  return (
    // 渲染历史记录列表
  );
};