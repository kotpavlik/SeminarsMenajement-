import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";


export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [svgr(
      {
     exportAsDefault: true,
    }
    ),react(), tailwindcss()],
    server: {
      port: 3000
    },
    define: {
      'process.env': env
    }
  }
})