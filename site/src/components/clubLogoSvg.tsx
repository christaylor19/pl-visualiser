import { FC } from 'react';

interface Props {
  id: number;
  width?: number;
  height?: number;
  x: number;
  y: number;
}

const ClubImageSvg: FC<Props> = ({ id, width = 12, height = 12, x, y }) => {
  return (
    <svg>
      <image
        href={`https://media.api-sports.io/football/teams/${id.toString()}.png`}
        width={width}
        height={height}
        x={x}
        y={y}
      />
    </svg>
  );
};

export default ClubImageSvg;
