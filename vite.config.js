import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: [
      '8704-202-129-240-131.ngrok-free.app',
    ],
  },
  plugins: [react()],
});
