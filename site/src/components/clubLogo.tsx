import { FC } from 'react';

interface Props {
  id: number;
  width: number;
  height: number;
}

const ClubLogo: FC<Props> = ({ id, width = 12, height = 12 }) => {
  return (
    <img
      src={`https://media.api-sports.io/football/teams/${id.toString()}.png`}
      width={width}
      height={height}
    />
  );
};

export default ClubLogo;
