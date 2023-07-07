import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//const isProduction = process.env.NODE_ENV === 'production';
//const target = isProduction ? 'https://bl-backend.onrender.com' : 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        onProxyReq: (proxyReq, req, _res) => {
          console.log('Sending Request to the Target:', req.method, req.url);
        },
        onProxyRes: (proxyRes, req, _res) => {
          console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        },
      },
    },
  },
});
