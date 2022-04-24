import { useEffect, useState } from 'react';

import { FetchStatus } from './useFetch';

interface UseTypedFetch<T> {
  status: FetchStatus;
  data: T[];
}

function useTypedFetch<T>(url: string, options?: RequestInit): UseTypedFetch<T> {
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(url, options);
      const data = (await response.json()) as T[];
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [url]);



  return { status, data };
}

export default useTypedFetch;
