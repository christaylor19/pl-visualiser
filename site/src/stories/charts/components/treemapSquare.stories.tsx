import { ComponentMeta, ComponentStory } from '@storybook/react';

import TreemapSquare, { Props } from '../../../charts/visx/components/treemapSquare';

export default {
  title: 'Charts/Components/TreemapSquare',
  component: TreemapSquare,
  decorators: [
    (Story) => (
      <svg width={200} height={200}>
        <Story />
      </svg>
    ),
  ],
} as ComponentMeta<typeof TreemapSquare>;

export const Default: ComponentStory<typeof TreemapSquare> = (args) => (
  <TreemapSquare {...args} />
);

Default.args = {
  width: 100,
  height: 100,
  stroke: 'rgb(17, 75, 95)',
  fill: 'rgb(0, 25, 115)'
} as Props;
