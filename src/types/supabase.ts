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
      user_settings: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          interface_language: string
          theme: string
          api_settings: {
            provider: string
            apiKey: string
            apiUrl: string
            model: string
          }
          translation_settings: {
            maxConcurrentRequests: number
            chunkSize: number
            delayBetweenChunks: number
            defaultSourceLang: string
            defaultTargetLang: string
            temperature: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string
          interface_language?: string
          theme?: string
          api_settings?: Record<string, any>
          translation_settings?: Record<string, any>
        }
        Update: {
          display_name?: string
          interface_language?: string
          theme?: string
          api_settings?: Record<string, any>
          translation_settings?: Record<string, any>
        }
      }
      translation_templates: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          content: string
          tags: string[]
          is_built_in: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          description?: string
          content: string
          tags?: string[]
          is_built_in?: boolean
          display_order?: number
        }
        Update: {
          name?: string
          description?: string
          content?: string
          tags?: string[]
          display_order?: number
        }
      }
      translation_history: {
        Row: {
          id: string
          user_id: string
          source_text: string
          translated_text: string
          source_lang: string
          target_lang: string
          is_favorite: boolean
          template_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          source_text: string
          translated_text: string
          source_lang: string
          target_lang: string
          is_favorite?: boolean
          template_id?: string
        }
        Update: {
          is_favorite?: boolean
        }
      }
      user_tags: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
        }
        Update: {
          name?: string
          color?: string
        }
      }
    }
  }
}