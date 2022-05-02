import { DefaultTheme } from 'styled-components';
import { Mode } from 'types';

export const themeConfig: Record<Mode, DefaultTheme> = {
  dark: {
    bgColour: '#161625',
    cardBgColour: '#1E1E30',
    sidebarColour: '#1E1E30',
    iconColour: '#6c757d',
    textColour: '#f8f9fa',
  },
  light: {
    bgColour: '#ffffff',
    cardBgColour: '#ffffff',
    sidebarColour: '#F6F6F7',
    iconColour: '#6c757d',
    textColour: '#000000',
  },
};

export const getTheme = (mode: Mode): DefaultTheme => themeConfig[mode];

