import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authConfig = {
  providers: ['google', 'github'],
  theme: 'dark',
  appearance: {
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#4f46e5',
          brandAccent: '#4338ca',
        },
      },
      dark: {
        colors: {
          brand: '#6366f1',
          brandAccent: '#4f46e5',
        },
      },
    },
  },
  localization: {
    variables: {
      sign_in: {
        email_label: '邮箱地址',
        password_label: '密码',
      },
    },
  },
};