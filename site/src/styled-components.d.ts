import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColour: string;
    textColour: string;
    sidebarColour: string;
    iconColour: string;
    cardBgColour: string;
  }
}
