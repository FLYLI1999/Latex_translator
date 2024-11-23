import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { Provider } from '@supabase/supabase-js'
import { supabase, authConfig } from '../../config/supabase-auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth';

const AuthPage: React.FC = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const from = (location.state as any)?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location, setUser]);

  const handleAuthError = async (error: Error) => {
    if (error.message.includes('429') && !isRetrying) {
      setIsRetrying(true);
      toast.info(t('auth.retrying'));
      setTimeout(() => {
        setIsRetrying(false);
      }, 5000);
      return;
    }
    toast.error(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('auth.title')}
          </h2>
        </div>
        <Auth 
          supabaseClient={supabase}
          {...authConfig}
          providers={['google', 'github'].map(provider => provider as Provider)}
          view="sign_in"
        />
      </div>
    </div>
  );
};

export default AuthPage;