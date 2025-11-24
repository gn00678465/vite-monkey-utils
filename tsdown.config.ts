import { defineConfig } from 'tsdown'

export default defineConfig({
  exports: true,
  entry: [
    './src/index.ts',
    './src/plugin/index.ts',
  ],
  format: ['esm'],
  dts: {
    sourcemap: true,
  },
  unbundle: true,
  skipNodeModulesBundle: true,
  external: [
    'vite',
  ],
})
