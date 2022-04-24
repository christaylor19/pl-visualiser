import { ComponentMeta, ComponentStory } from '@storybook/react';

import Layout, { Props } from '../../components/layout';

export default {
  title: 'Components/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

export const Default: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args} />
);
Default.args = {
  children: <>Hello World</>,
} as Props;
