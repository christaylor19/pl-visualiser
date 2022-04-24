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
        '/socials': {
          target:
            'https://pl-visualisation-functions.netlify.app/.netlify/functions/get-socials',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/socials/, ''),
        },
        '/social': {
          target:
            'https://pl-visualisation-functions.netlify.app/.netlify/functions/get-social',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/social/, ''),
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
