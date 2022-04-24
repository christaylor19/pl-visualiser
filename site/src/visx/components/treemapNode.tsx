import { ScaleLinear } from 'd3-scale';
import { FC } from 'react';

import { Group } from '@visx/group';
import { Text } from '@visx/text';

import ClubImageSvg from '../../components/clubLogoSvg';
import { ClubMetadata } from '../../types/config';
import TreemapSquare from './treemapSquare';

export interface Props {
  colorScale: ScaleLinear<string, string, never>;
  node: any;
  index: number;
  backgroundColor: string;
  metadata?: ClubMetadata;
}

const TreemapNode: FC<Props> = ({
  colorScale,
  node,
  index,
  backgroundColor,
  metadata,
}) => {
  const nodeWidth = node.x1 - node.x0;
  const nodeHeight = node.y1 - node.y0;

  return (
    <Group key={`node-${index}`} top={node.y0} left={node.x0}>
      {node.depth === 1 && (
        <>
          <TreemapSquare
            width={nodeWidth}
            height={nodeHeight}
            stroke={backgroundColor}
            fill={colorScale(node.value || 0)}
          />
          {metadata && metadata.apisports ? (
            <ClubImageSvg
              id={metadata.apisports.id}
              width={16}
              height={16}
              x={nodeWidth / 2 - 8}
              y={nodeHeight / 2 - 8}
            />
          ) : (
            <Text
              x={nodeWidth / 2}
              y={nodeHeight / 2}
              verticalAnchor="middle"
              textAnchor="middle"
              fontSize={10}
              scaleToFit
            >
              {node.data.id}
            </Text>
          )}
        </>
      )}
    </Group>
  );
};

export default TreemapNode;
