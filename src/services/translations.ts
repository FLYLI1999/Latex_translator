import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Translation = Database['public']['Tables']['translations']['Row'];

export const saveTranslation = async (translation: Omit<Translation, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('translations')
    .insert(translation)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserTranslations = async (userId: string) => {
  const { data, error } = await supabase
    .from('translations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const toggleFavorite = async (translationId: string, isFavorite: boolean) => {
  const { data, error } = await supabase
    .from('translations')
    .update({ is_favorite: isFavorite })
    .eq('id', translationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTranslation = async (translationId: string) => {
  const { error } = await supabase
    .from('translations')
    .delete()
    .eq('id', translationId);

  if (error) throw error;
};