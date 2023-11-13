import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600 },
  server: {
    proxy: {
      // "/api": "https://rabeyagorup.onrender.com/",
      "/api": "http://localhost:4000/",
    },
  },
});
