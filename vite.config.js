import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/glare/' : '/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/assets/main.scss" as *;`, //! vet ej om länken stämmer
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  server: { port: 3000 },
  build: {
    sourcemap: true,
  },
});
