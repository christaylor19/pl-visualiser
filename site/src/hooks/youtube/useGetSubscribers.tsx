import { useEffect, useState } from 'react';

import { YoutubeChannel } from '@/types/api/youtube';

import useFetch, { FetchStatus } from '../useFetch';

interface UseGetSubscribers {
  status: FetchStatus;
  data: any;
}

const useGetSubscribers = (channels: string[]): UseGetSubscribers => {
  const channelList = channels.join(',');
  const [sortedData, setSortedData] = useState<YoutubeChannel[]>([]);

  const url = `/youtube?id=${channelList}&part=id,statistics,snippet&key=${
    import.meta.env.VITE_YOUTUBE_KEY
  }`;
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    status,
    data: { items },
  } = useFetch(url, options);

  useEffect(() => {
    if (status === 'fetched' && items && items.length > 0) {
      setSortedData(
        (items as YoutubeChannel[]).sort(
          (a, b) =>
            parseInt(b.statistics.viewCount, 10) -
            parseInt(a.statistics.viewCount, 10)
        )
      );
    }
  }, [items, status]);

  return { status, data: sortedData };
};

export default useGetSubscribers;
