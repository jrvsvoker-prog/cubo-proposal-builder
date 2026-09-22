import configured from '@proposal-profile'
import type { ProposalProfile } from './profile-schema'

export type { ProposalProfile } from './profile-schema'

/** One profile is selected at build time; the customer cannot switch companies. */
export const profile: ProposalProfile = configured
