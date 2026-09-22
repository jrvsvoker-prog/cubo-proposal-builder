import type { DashboardConfig, Scale, Business } from './dashboard-model'
import type { ProposalProfile } from './profile'

export interface DashboardInput {
  business: Business
  displayName: string
  appName: string
  navigation: string[]
  staffInitials: string
  staffName?: string
  staffRole?: string
  logo?: string
  units: string[]
  unitSingular: string
  unitPlural: string
  scales: Scale[]
  defaultMetrics: string[]
  assumptions: string
  primary: string
  seed?: string
  demoDate?: string
  monthlyDeals?: number
  priceRange?: number[]
}

export function dashboardInputFromProfile(p: ProposalProfile): DashboardInput {
  return {
    business: p.business as Business,
    displayName: p.displayName,
    appName: p.name,
    navigation: p.navigation,
    staffInitials: p.staffInitials,
    staffName: p.staffName,
    staffRole: p.staffRole,
    logo: p.logo,
    units: p.units,
    unitSingular: p.unitSingular,
    unitPlural: p.unitPlural,
    scales: p.dashboard.scales as Scale[],
    defaultMetrics: [...p.dashboard.defaultMetrics],
    assumptions: p.dashboard.assumptions,
    primary: p.theme.primary,
    seed: p.displayName,
    demoDate: p.demoDate,
    monthlyDeals: p.dashboard.monthlyDeals,
    priceRange: p.dashboard.priceRange,
  }
}

export function dashboardModelConfig(input: DashboardInput): DashboardConfig {
  return {
    business: input.business,
    units: input.units,
    seed: input.seed,
    demoDate: input.demoDate,
    monthlyDeals: input.monthlyDeals,
    priceRange: input.priceRange,
    displayName: input.displayName,
  }
}
