import type { Plugin } from 'vite'
import { waitForElement } from '../utils/waitForElement'

export default function viteMonkeyUtilsPlugin(): Plugin {
  const virtualModuleId = 'virtual:monkey-utils'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  return {
    name: 'vite-monkey-utils-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return {
          code: `${waitForElement.toString()}`,
          map: undefined,
        }
      }
    },
  }
}
