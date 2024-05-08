import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'http://localhost:5000',
      '/register':'http://localhost:5000',
      '/user':'http://localhost:5000'
    }
  }
})
