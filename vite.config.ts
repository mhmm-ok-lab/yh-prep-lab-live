import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    host: true,
    allowedHosts: true
  },
  test: {
    globals: true,
    environment: "node"
  }
});
