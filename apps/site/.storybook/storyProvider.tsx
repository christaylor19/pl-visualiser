import { FC, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from 'ui';

import ModeContextProvider from '../src/contexts/appContext';

interface Props {
  children: ReactNode;
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
