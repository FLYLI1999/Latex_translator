import { toast } from 'react-toastify';

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoff?: boolean;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 5000,
    backoff = true
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (!error.message.includes('ERR_INSUFFICIENT_RESOURCES')) {
        throw error;
      }

      if (attempt < maxRetries - 1) {
        const delay = backoff
          ? Math.min(initialDelay * Math.pow(2, attempt), maxDelay)
          : initialDelay;
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

export const handleSupabaseError = (error: Error, customMessage?: string) => {
  if (error.message.includes('ERR_INSUFFICIENT_RESOURCES')) {
    return false; // 不显示toast
  }
  toast.error(customMessage || error.message);
  return true;
};