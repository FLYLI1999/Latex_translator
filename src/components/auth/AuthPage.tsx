import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase, authConfig } from '../../config/supabase-auth';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            登录/注册
          </h2>
        </div>
        <Auth 
          supabaseClient={supabase}
          {...authConfig}
          view="sign_in"
        />
      </div>
    </div>
  );
};

export default AuthPage;