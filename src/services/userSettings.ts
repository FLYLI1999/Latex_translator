import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];

export const getUserSettings = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserSettings = async (
  userId: string,
  settings: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) => {
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};