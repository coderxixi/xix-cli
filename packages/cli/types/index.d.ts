import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

export * from './styleVars'

declare module 'vue' {
  export interface GlobalComponents {
    xiStyleVars: typeof import('@xixi-cli/cli')['_StyleVarsComponent']
  }

  export interface ComponentCustomProperties {
    
  }
}
