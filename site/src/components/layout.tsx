import { FC, useContext } from 'react';
import styled from 'styled-components';

import { ModeContext } from '../contexts/appContext';
import Sidebar from './sidebar';

export type Props = {
  children: React.ReactNode;
};

const Page = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 96px 1fr;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.bgColour};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const Layout: FC<Props> = ({ children }) => {
  const { mode } = useContext(ModeContext);
  return (
    <Page>
      <Sidebar />
      <div />
      <Content>
        <Main>{children}</Main>
      </Content>
    </Page>
  );
};

export default Layout;
