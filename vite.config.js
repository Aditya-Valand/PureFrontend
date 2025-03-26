import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'd1ee-2402-3a80-4413-fcdf-ec7d-8b24-b233-c226.ngrok-free.app',
      '0a8e-2402-3a80-443c-8fb1-9870-9a4c-816e-6b23.ngrok-free.app',
      '5952-2402-3a80-443c-8fb1-9870-9a4c-816e-6b23.ngrok-free.app',
      'ee1a-2402-3a80-4414-9b9f-b41a-7b3a-6160-e670.ngrok-free.app',
    ],
    
    port: 5173,
  },
  plugins: [react()],
});
