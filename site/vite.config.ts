import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      open: '/',
      https:
        mode === 'development' &&
        fs.existsSync('localhost-key.pem') &&
        fs.existsSync('localhost.pem')
          ? {
              key: fs.readFileSync('localhost-key.pem'),
              cert: fs.readFileSync('localhost.pem'),
            }
          : {},
      proxy: {
        '/twitter': {
          target: 'https://api.twitter.com/2/users/by',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/twitter/, ''),
        },
        '/linkedin': {
          target:
            'https://dazzling-benz-scraper.netlify.app/.netlify/functions/get-linkedin',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/linkedin/, ''),
        },
        '/facebook': {
          target:
            'https://dazzling-benz-scraper.netlify.app/.netlify/functions/get-facebook',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/facebook/, ''),
        },
        '/instagram': {
          target:
            'https://dazzling-benz-scraper.netlify.app/.netlify/functions/get-instagram',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/instagram/, ''),
        },
        '/reddit': {
          target: 'https://www.reddit.com/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/reddit/, ''),
        },
        '/youtube': {
          target: 'https://www.googleapis.com/youtube/v3/channels',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/youtube/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@mocks': path.resolve(__dirname, './mocks'),
        '@utils': path.resolve(__dirname, './utils'),
      },
    },
  });
};
