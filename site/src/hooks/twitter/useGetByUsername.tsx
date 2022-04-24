import { useEffect, useState } from 'react';

import { TwitterAccountData } from '@/types/api/twitter';

import useFetch, { FetchStatus } from '../useFetch';

interface UseGetByUsername {
  status: FetchStatus;
  data: TwitterAccountData[];
}

const useGetByUsername = (usernames: string[]): UseGetByUsername => {
  const usernameList = usernames.join(',');
  const url = `/twitter?usernames=${usernameList}&user.fields=public_metrics`;

  const [sortedData, setSortedData] = useState<TwitterAccountData[]>([]);

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TWITTER_TOKEN}`,
    },
  };

  const {
    status,
    data: { data },
  } = useFetch(url, options);

  useEffect(() => {
    if (status === 'fetched' && data && data.length > 0) {
      setSortedData((data as TwitterAccountData[]).sort((a, b) => a.username.localeCompare(b.username)));
    }
  }, [data, status]);

  return { status, data: sortedData };
};

export default useGetByUsername;
