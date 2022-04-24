import { StoryProvider } from './storyProvivder';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <StoryProvider>
        <Story />
      </StoryProvider>
    </>
  ),
];
