import { defineConfig } from "vite"

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "globals" as *;
        @use "variables" as *;
        @use "mixins" as *;`,
      },
    },
  },
})
