// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Sin @tailwindcss/vite
export default defineConfig({
  integrations: [react()],
});
