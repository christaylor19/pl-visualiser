import { useEffect, useState } from 'react';

import { ClubData } from '@/types/clubs';
import fetchRedditData from '@/utils/fetchRedditData';
import { mapFromRedditData } from '@/utils/mapData';

import { FetchStatus } from '../useFetch';

const useGetRedditSubscribers = (subreddits: string[]) => {
  const [subscribers, setSubscribers] = useState<ClubData[]>([]);
  const [status, setStatus] = useState<FetchStatus>('idle');

  useEffect(() => {
    setStatus('fetching');
    const fetchSubscribers = async () => {
      const subs = await Promise.all(
        subreddits.map(async (subreddit) => {
          const res = await fetchRedditData(subreddit);
          if (!res) {
            return mapFromRedditData();
          }
          return mapFromRedditData(res);
        })
      );
      setSubscribers(subs.flat());
    };

    fetchSubscribers();
    setStatus('fetched');
  }, []);

  return { data: subscribers, status };
};

export default useGetRedditSubscribers;
