import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// we have to configure the tailwind
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
  