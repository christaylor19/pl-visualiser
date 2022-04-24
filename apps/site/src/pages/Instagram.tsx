import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout';
import useGetInstaFollowers from '@/hooks/instagram/useGetFollowers';
import { ClubData } from '@/types/clubs';
import { mapFromScrapedData, mapFromTwitterData } from '@/utils/mapData';

import VisxTreemap from '../charts/visx/treemap';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Instagram: FC = () => {
  const el = document.getElementById('ChartWrapper');

  const [chartData, setChartData] = useState<ClubData[]>([]);

  const { data, status } = useGetInstaFollowers();

  useEffect(() => {
    if (status === 'fetched') {
      const mappedData = mapFromScrapedData(data, 'instagram');
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

export default Instagram;
