import { ComponentMeta, ComponentStory } from '@storybook/react';

import H1 from '../../components/h1';

export default {
  title: 'Components/H1',
  component: H1,
} as ComponentMeta<typeof H1>;

export const Default: ComponentStory<typeof H1> = (args) => (
  <H1>{args.text}</H1>
);

Default.args = {
  text: 'Heading 1',
};
