import { useEffect, useState } from 'react';

import useFetch, { FetchStatus } from '../useFetch';

interface UseGetSubscribers {
  status: FetchStatus;
  data: any;
}

const useGetSubscribers = (subreddit: string): UseGetSubscribers => {
  const [redditData, setRedditData] = useState<any>({});

  const url = `/reddit/r/${subreddit}/about.json`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    status,
    data: { data },
  } = useFetch(url, options);

  useEffect(() => {
    if (status === 'fetched' && data) {
      setRedditData(data);
    }
  }, [data, status]);

  return { status, data: redditData };
};

export default useGetSubscribers;
