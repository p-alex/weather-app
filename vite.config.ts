/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // Ensure V8 is used
      include: ["src/**"],
      exclude: [
        "src/components/DesignToggler",
        "src/**/*.css",
        "src/main.tsx",
        "src/App.tsx",
        "src/**/*.context.tsx",
      ],
    },

    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    css: true,
  },
  plugins: [react(), tailwindcss()],
});
