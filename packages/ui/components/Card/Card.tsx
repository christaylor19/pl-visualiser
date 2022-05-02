import { FC } from 'react';

import { Anchor, Desc, Title, Wrapper } from './Card.styles';

export interface Props {
  href: string;
  title: string;
  description: string;
  bgColour: string;
}

const Card: FC<Props> = ({ href, title, description, bgColour }) => {
  return (
    <Anchor to={href} bgColour={bgColour}>
      <Wrapper>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
      </Wrapper>
    </Anchor>
  );
};

export default Card;
