import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Anchor = styled(Link)`
  background-color: ${({ theme }) => theme.cardBgColour};
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  text-decoration: none !important;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TopWrapper = styled.div<{ topColour: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ topColour }) => topColour};
  min-height: 8rem;
  width: 100%;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 12rem;
  width: 100%;
  padding: 1rem 0;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  color: ${({ theme }) => theme.textColour};
  padding: 0 1rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Desc = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${({ theme }) => theme.textColour};
  padding: 0 1rem;
  text-align: left;
`;

export interface Props {
  href: string;
  title: string;
  description: string;
  topColour: string;
  icon: string;
}

const PreviewCard: FC<Props> = ({
  href,
  topColour,
  icon,
  title,
  description,
}) => (
  <>
    <Anchor to={href}>
      <TopWrapper topColour={topColour}>
        <img src={icon} alt="preview"  height={32} />
      </TopWrapper>
      <BottomWrapper>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
      </BottomWrapper>
    </Anchor>
  </>
);

export default PreviewCard;
