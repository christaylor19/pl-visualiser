import { FC, useContext } from 'react';
import { GitHub, Home, Inbox, Linkedin, Moon } from 'react-feather';
import { IoIosPeople } from 'react-icons/io';
import {
    SiFacebook, SiInstagram, SiLinkedin, SiReddit, SiTwitter, SiYoutube
} from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import { ModeContext } from '../contexts/appContext';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.sidebarColour};
  position: fixed;
  min-width: 96px;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  word-break: break-word;
  color: ${({ theme }) => theme.textColour};
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const IconLink = styled.a`
  padding: 1.5rem 0;
`;

const LinkItem = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  text-decoration: none;
  color: ${({ theme }) => theme.textColour};
  cursor: auto;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const Sidebar: FC = () => {
  const { toggle, mode } = useContext(ModeContext);
  const theme = useContext(ThemeContext);
  const location = useLocation();

  const selectedIconColour = mode === 'dark' ? '#C5E7FC' : '#3F0F52';

  const iconStyles = {
    cursor: 'pointer',
  }

  return (
    <StyledSidebar>
      <Title>
        <LinkItem to="/">
          <Home
            color={
              location.pathname === '/' ? selectedIconColour : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
      </Title>
      <Links>
        <LinkItem to="/followers">
          <SiTwitter
            size={26}
            color={
              location.pathname === '/followers'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/subs">
          <SiYoutube
            size={30}
            color={
              location.pathname === '/subs'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/rdt-subs">
          <SiReddit
            size={30}
            color={
              location.pathname === '/rdt-subs'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/lin">
          <SiLinkedin
            size={30}
            color={
              location.pathname === '/lin'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/gram">
          <SiInstagram
            size={30}
            color={
              location.pathname === '/gram'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/fbk">
          <SiFacebook
            size={30}
            color={
              location.pathname === '/fbk'
                ? selectedIconColour
                : theme.textColour
            }
            style={iconStyles}
          />
        </LinkItem>
        <LinkItem to="/comparison">
          <IoIosPeople
            size={30}
            style={iconStyles}
          />
        </LinkItem>
      </Links>
      <Buttons>
        <Moon
          color="#6c757d"
          onClick={toggle}
          style={{ cursor: 'pointer', padding: '1.5rem 0' }}
        />
        <IconLink href="https://github.com/christaylor19/vis-project">
          <GitHub color="rgba(108,117,125,.6)" />
        </IconLink>
        <IconLink href="https://www.linkedin.com/in/chris-taylor-b50703a7/">
          <Linkedin color="rgba(0,123,255,.6)" />
        </IconLink>
        <IconLink href="mailto:christaylor94.dev@gmail.com">
          <Inbox color="rgba(182,133,77,.6)" />
        </IconLink>
      </Buttons>
    </StyledSidebar>
  );
};

export default Sidebar;
