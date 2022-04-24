import { MemoryRouter } from 'react-router-dom';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import PreviewCard, { Props } from '../../components/previewCard';

export default {
  title: 'Components/PreviewCard',
  component: PreviewCard,
} as ComponentMeta<typeof PreviewCard>;

export const Default: ComponentStory<typeof PreviewCard> = (args) => (
  <PreviewCard {...args} />
);

Default.args = {
  href: '/rdt-subs',
  title: 'Reddit',
  description: 'Click here for comparison of Reddit Football subreddit subscribers',
  topColour: '#f5f5f5',
  icon: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
} as Props;
