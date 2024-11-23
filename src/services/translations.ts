import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type TranslationHistory = Database['public']['Tables']['translation_history']['Row'];

export const saveTranslation = async (translation: Omit<TranslationHistory, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('translation_history')
    .insert(translation)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserTranslations = async (userId: string) => {
  const { data, error } = await supabase
    .from('translation_history')
    .select(`
      *,
      template:translation_templates(name)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const toggleFavorite = async (translationId: string, isFavorite: boolean) => {
  const { data, error } = await supabase
    .from('translation_history')
    .update({ is_favorite: isFavorite })
    .eq('id', translationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTranslation = async (translationId: string) => {
  const { error } = await supabase
    .from('translation_history')
    .delete()
    .eq('id', translationId);

  if (error) throw error;
};