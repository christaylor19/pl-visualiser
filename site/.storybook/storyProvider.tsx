import { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ModeContextProvider from '../src/contexts/appContext';
import getTheme from '../src/styles/theme';

interface Props {
  children: React.ReactNode;
}

export const StoryProvider: FC<Props> = ({ children }) => {
  return (
    <ModeContextProvider>
      <ThemeProvider theme={getTheme('light')}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </ModeContextProvider>
  );
};
