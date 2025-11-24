import { defineConfig } from 'tsdown'

export default defineConfig({
  exports: true,
  entry: [
    './src/index.ts'
  ],
  format: ['esm'],
  dts: {
    sourcemap: true,
  },
  unbundle: true
})
