import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Anchor = styled(Link)<{ bgColour: string }>`
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  text-decoration: none !important;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  min-height: 20rem;
  min-width: 100%;
  background-color: ${({ bgColour }) => bgColour};
`;

export const Wrapper = styled.div`
  padding: 0 2rem;
`;

export const Title = styled.h3`
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

export const Desc = styled.p`
  font-size: 1rem;
  margin: 0;
  color: ${({ theme }) => theme.textColour};
  padding: 0 1rem;
  text-align: left;
`;
