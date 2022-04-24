import { FC } from 'react';

export interface Props {
  width: number;
  height: number;
  stroke: string;
  fill: string;
}

const TreemapSquare: FC<Props> = ({
  width,
  height,
  stroke,
  fill,
}) => (
  <rect
    width={width}
    height={height}
    stroke={stroke}
    strokeWidth={2}
    fill={fill}
  />
);

export default TreemapSquare;
