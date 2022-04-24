import { useEffect, useState } from 'react';

export type FetchStatus = 'idle' | 'fetching' | 'fetched';

interface UseFetch {
  status: FetchStatus;
  data: any;
}

function useFetch(url: string, options?: RequestInit): UseFetch {
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(url, options);
      const data = (await response.json());
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [url]);

  return { status, data };
}

export default useFetch;
