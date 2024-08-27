import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  base: "",
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  css: {
    postcss: {
      plugins : [tailwindcss()]
    }
  }
});
