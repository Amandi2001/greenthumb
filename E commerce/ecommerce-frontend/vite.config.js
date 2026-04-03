import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path එක '/' ලෙස සහතික කිරීම වැදගත්
  base: '/', 
  build: {
    // Build එකේදී එන කුඩා errors මග හැරීමට මෙය උදව් වේ
    outDir: 'dist',
  },
  server: {
    // Localhost එකේදී backend එක සමඟ ලෙහෙසියෙන් ගනුදෙනු කිරීමට
    historyApiFallback: true,
  }
})