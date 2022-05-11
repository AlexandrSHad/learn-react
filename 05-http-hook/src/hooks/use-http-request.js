import { useCallback, useState } from 'react';

const useHttpRequest = requestConfig => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(async (requestConfig, callback) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers || {},
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      callback && callback(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [ send, isLoading, error ];
};

export default useHttpRequest;