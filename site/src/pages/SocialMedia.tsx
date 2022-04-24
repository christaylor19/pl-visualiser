import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import Example from '@/charts/visx/barGroup';
import H1 from '@/components/h1';
import Layout from '@/components/layout';
import { metadata } from '@/config/clubs/premier-league';
import useGetSocials from '@/hooks/useGetSocials';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SocialMedia: FC = () => {
  const { data } = useGetSocials(metadata);
  const [render, setRender] = useState(false);
  const el = document.getElementById('ChartWrapper');

  useEffect(() => {
    if (
      data.facebook.length > 0 &&
      data.twitter.length > 0 &&
      data.instagram.length > 0 &&
      data.youtube.length > 0 &&
      data.linkedin.length > 0 &&
      data.reddit.length > 0
    ) {
      setRender(true);
    }
  }, [data]);

  return (
    <Layout>
      <Wrapper id="ChartWrapper">
        {render && (
          <Example
            width={el?.clientWidth || window.innerWidth}
            height={el?.clientHeight || window.innerHeight}
            data={data}
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export default SocialMedia;
