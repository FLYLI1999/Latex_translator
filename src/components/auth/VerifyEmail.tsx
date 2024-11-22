import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useAuthStore from '../../store/auth';
import { Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail, isLoading } = useAuthStore();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token)
        .then(() => setVerified(true))
        .catch((err) => setError(err.message));
    }
  }, [searchParams, verifyEmail]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {verified ? (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Email verified successfully!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your email has been verified. You can now use all features of your account.
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Continue to login
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Verification failed
            </h2>
            <p className="mt-2 text-sm text-red-600">
              {error || 'Unable to verify your email. Please try again.'}
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Back to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;