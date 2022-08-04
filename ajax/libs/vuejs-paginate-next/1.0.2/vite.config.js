import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components", "index.js"),
      name: "VuejsPaginateNext",
      target: "es2015",
      minify: false,
      fileName: (format) => `vuejs-paginate-next.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [vue()],
});
