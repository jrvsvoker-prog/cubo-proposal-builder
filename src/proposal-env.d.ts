declare module '*.svg?raw' {
  const src: string
  export default src
}

declare module '@proposal-profile' {
  import type { ProposalProfile } from './data/profile-schema'
  const profile: ProposalProfile
  export default profile
}

declare module '@cuboapp/ui-vue/icons' {
  export function registerAllIcons(): void
}
