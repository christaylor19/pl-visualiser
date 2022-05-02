import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '../theme';

interface Props {
  children: React.ReactNode;
}

export const StoryProvider: FC<Props> = ({ children }) => (
  <ThemeProvider theme={getTheme('light')}>{children}</ThemeProvider>
);
