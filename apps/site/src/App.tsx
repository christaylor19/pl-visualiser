import './App.css';

import { FC, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { themeConfig } from 'ui';

import { ModeContext } from './contexts/appContext';
import Facebook from './pages/Facebook';
import Home from './pages/Home';
import Instagram from './pages/Instagram';
import LinkedIn from './pages/LinkedIn';
import RedditSubs from './pages/RedditSubs';
import SocialMedia from './pages/SocialMedia';
import TwitterFollowers from './pages/TwitterFollowers';
import YoutubeSubs from './pages/YoutubeSubs';

const App: FC = () => {
  const { mode } = useContext(ModeContext);

  const [theme, setTheme] = useState<DefaultTheme>(themeConfig.light);

  useEffect(() => {
    setTheme(themeConfig[mode]);
  }, [mode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="followers" element={<TwitterFollowers />} />
            <Route path="subs" element={<YoutubeSubs />} />
            <Route path="rdt-subs" element={<RedditSubs />} />
            <Route path="lin" element={<LinkedIn />} />
            <Route path="fbk" element={<Facebook />} />
            <Route path="gram" element={<Instagram />} />
            <Route path="comparison" element={<SocialMedia />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
