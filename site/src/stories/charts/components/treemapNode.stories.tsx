import { ComponentMeta, ComponentStory } from '@storybook/react';
import { scaleLinear } from '@visx/scale';

import TreemapNode, { Props } from '../../../charts/visx/components/treemapNode';

export default {
  title: 'Charts/Components/TreemapNode',
  component: TreemapNode,
  decorators: [
    (Story) => (
      <svg width={2000} height={2000}>
        <Story />
      </svg>
    ),
  ],
} as ComponentMeta<typeof TreemapNode>;

export const Default: ComponentStory<typeof TreemapNode> = (args) => (
  <TreemapNode {...args} />
);

const color1 = '#001973';
const color2 = '#adbfff';

Default.args = {
  colorScale: scaleLinear<string>({
    domain: [0, 1000],
    range: [color2, color1],
  }),
  node: {
    x0: 200,
    x1: 500,
    y0: 200,
    y1: 500,
    parent: null,
    depth: 1,
    data: {
      id: 'test',
      parent: null,
      size: 50,
    },
  },
  index: 0,
  backgroundColor: '#fff',
} as Props;
