import log, { Colour } from 'logger';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout';
import { metadata } from '@/config/clubs/premier-league';
import useGetSubscribers from '@/hooks/youtube/useGetSubscribers';
import { ClubData } from '@/types/clubs';
import { mapFromYouTubeData } from '@/utils/mapData';

import VisxTreemap from '../charts/visx/treemap';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const YoutubeSubs: FC = () => {
  const el = document.getElementById('ChartWrapper');

  const [chartData, setChartData] = useState<ClubData[]>([]);

  const { data, status } = useGetSubscribers(
    metadata.map((i) => i.youtube.channel)
  );


  useEffect(() => {
    if (status === 'fetched') {
      log('Successfully fetched data!', Colour.Green);

      const mappedData = mapFromYouTubeData(data);
      setChartData(mappedData);
    }
  }, [data, status]);

  return (
    <Layout>
      <Wrapper id="ChartWrapper">
        {chartData.length > 0 && (
          <VisxTreemap
            width={el?.clientWidth || window.innerWidth}
            height={el?.clientHeight || window.innerHeight}
            data={chartData}
            status={status}
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export default YoutubeSubs;
