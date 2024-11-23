export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      translations: {
        Row: {
          id: string
          created_at: string
          user_id: string
          source_text: string
          translated_text: string
          source_lang: string
          target_lang: string
          is_favorite: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          source_text: string
          translated_text: string
          source_lang: string
          target_lang: string
          is_favorite?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          source_text?: string
          translated_text?: string
          source_lang?: string
          target_lang?: string
          is_favorite?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}