import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ 
    tailwindcss(),
    react()
  ],
  server: {
    allowedHosts: [
      "5cd9-2406-7400-c4-84b3-c41c-ede8-88cc-7539.ngrok-free.app"
    ]
  }
})
