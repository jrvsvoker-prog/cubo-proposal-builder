import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readProfile } from './scripts/profile.mjs'

const kit = fileURLToPath(new URL('./vendor/cubo/', import.meta.url))

export default defineConfig(({ command, mode }) => {
  const { file } = readProfile(fileURLToPath(new URL('.', import.meta.url)), mode)
  return ({
  base: './',
  plugins: [vueJsx(), ...(command === 'build' ? [viteSingleFile()] : [])],
  resolve: {
    dedupe: ['vue'],
    alias: [
      { find: '@proposal-profile', replacement: file },
      { find: '@cuboapp/styles/css', replacement: `${kit}/styles/tokens.css` },
      { find: '@cuboapp/styles', replacement: `${kit}/styles/all.css` },
      { find: '@cuboapp/ui-vue/css', replacement: `${kit}/ui/cubo-ui-vue.css` },
      { find: '@cuboapp/ui-vue/icons', replacement: `${kit}/ui/icons.js` },
      { find: '@cuboapp/ui-vue', replacement: `${kit}/ui/cubo-ui-vue.js` },
    ],
  },
  server: { port: 5197, strictPort: true, host: true },
  build: { assetsInlineLimit: 100000000, rollupOptions: { input: fileURLToPath(new URL('./index.html', import.meta.url)) } },
})
})
