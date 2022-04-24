import { log } from 'logger';
import { FC, useContext } from 'react';
import styled from 'styled-components';

import Card from '@/components/card';
import H1 from '@/components/h1';
import Layout from '@/components/layout';
import PreviewCard from '@/components/previewCard';
import { ModeContext } from '@/contexts/appContext';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Home: FC = () => {
  const { mode } = useContext(ModeContext);

  log(mode)

  return (
    <Layout>
      <H1>Data Visualisation Project by Chris Taylor</H1>
      <Content>
        <Grid>
          <PreviewCard
            href="/twitter"
            title="Twitter"
            description="Click here for comparison of Twitter followers"
            topColour={mode === 'dark' ? '#021927' : '#ECF7FE'}
            icon="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
          />
          <PreviewCard
            href="/subs"
            title="YouTube"
            description="Click here for comparison of Youtube channel subscribers"
            topColour={mode === 'dark' ? '#290000' : '#FFEBEB'}
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/318px-YouTube_full-color_icon_%282017%29.svg.png"
          />
          <PreviewCard
            href="/rdt-subs"
            title="Reddit"
            description="Click here for comparison of Reddit Football subreddit subscribers"
            topColour={mode === 'dark' ? '#290A00' : '#FFF0EB'}
            icon="https://www.redditinc.com/assets/images/site/reddit-logo.png"
          />
        </Grid>
        <Row>
          <Card
            href="/comparison"
            title="Social Media Comparison"
            description="Click here for comparison of clubs Social Media following"
            bgColour={mode === 'dark' ? '#141414' : '#EBEBEB'}
          />
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
