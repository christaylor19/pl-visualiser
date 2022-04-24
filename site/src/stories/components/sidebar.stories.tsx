import { ComponentMeta, ComponentStory } from '@storybook/react';

import Sidebar from '../../components/sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export const Default: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);
