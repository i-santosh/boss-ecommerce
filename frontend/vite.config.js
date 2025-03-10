import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(),
  
  ],
  server: {
    proxy: "http://localhost:3000",
    host: '0.0.0.0',
    cors: true,
    hmr: {
      clientPort: 443
    },
    allowedHosts: ['4c0d-2409-4055-210-968d-989d-39cc-2c8a-d4fa.ngrok-free.app']
  }
})
