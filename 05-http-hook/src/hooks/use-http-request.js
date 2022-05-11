import { useCallback, useState } from 'react';

const useHttpRequest = (url, httpMethod, mappingFn = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(async (body) => {
    setIsLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method: httpMethod || 'GET',
        body: body ? body : undefined,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const mappedData = mappingFn
        ? mappingFn(data)
        : data;
      
      return mappedData;
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url, httpMethod, mappingFn]);

  return [ send, isLoading, error ];
};

export default useHttpRequest;