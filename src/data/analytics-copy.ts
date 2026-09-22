import { profile } from './profile'
import type { AnaGroupKey, AnaMetric } from './analytics'
const a=profile.analyticsConfig
export const metricLabels:Record<AnaMetric,string>={revenue:a.revenueLabel,count:a.countLabel,avg:a.averageLabel,students:a.itemsLabel}
export const groupLabels:Record<AnaGroupKey,string>={direction:a.directionLabel,branch:profile.units.length?profile.unitSingular:'Компания',source:'Источник',program:a.programLabel}
export const availableGroups=(['direction',...(profile.units.length>1?['branch']:[]),'source','program'] as AnaGroupKey[])
