import { profile } from './profile'
import type {
  SectionCopy,
  Lead,
  LeadStage,
  PortalData,
  PortalMessage,
  PortalSub,
  PortalItem,
  PortalStripItem,
  PortalPayment,
  SelectionCourse,
  MassStat,
} from './profile-schema'

export { profile }
export type { SectionCopy, Lead, LeadStage, PortalData, PortalMessage, PortalSub, PortalItem, PortalStripItem, PortalPayment, SelectionCourse, MassStat }

export type PortalTone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral'
export type PortalPayState = 'due' | 'overdue' | 'paid'

// Весь контент — из профиля, выбранного при сборке (@proposal-profile).
// Числа дашборда и аналитики считает dashboard-model.ts / analytics.ts, не этот файл.
export const brand = profile.brand

export const hero = profile.hero

export const sections: SectionCopy[] = profile.sections

// ---------------------------------------------------------------------------
// 03 · Карточка ученика
// ---------------------------------------------------------------------------

export const entity = profile.entity

// ---------------------------------------------------------------------------
// 04 · Датавью: заявки в школу — пайплайн / таблица / карточки
// ---------------------------------------------------------------------------

export const stageNames = profile.stageNames as Record<string, string>

export const leads: Lead[] = profile.leads

// ---------------------------------------------------------------------------
// 05 · Подборки (КП-ссылка)
// ---------------------------------------------------------------------------

export const selectionCourses = profile.selectionCourses

export const massStats = profile.massStats

// ---------------------------------------------------------------------------
// 06 · Кабинет клиента
// ---------------------------------------------------------------------------

// Тип описан явно: поля sub/status/icon опциональны, service-профиль может их опускать.
// Каст: в схеме строковые типы tone/state/from (JSON-совместимость);
// компоненты используют конкретные union, поэтому портал реэкспортируется с сужением.
interface CompanyPortalItem {
  name: string; caption: string
  sub?: PortalSub
  status?: { label: string; tone: PortalTone }
}
interface CompanyPortalPayment {
  id: string; label: string; amount: string; date: string; state: PortalPayState
}
interface CompanyPortalMessage {
  id: string; from: 'peer' | 'me'; text: string; time: string; day: string
}
interface CompanyPortalData {
  login: {
    title: string
    email: string
    welcome: string
  }
  parent: { name: string; initials: string }
  children: CompanyPortalItem[]
  upcoming: PortalStripItem[]
  payment: { items: CompanyPortalPayment[] }
  chat: {
    title: string
    peer: { name: string; role: string; initials: string; status: string }
    messages: CompanyPortalMessage[]
    emptyTitle: string; emptyText: string
  }
}
export const portal = profile.portal as unknown as CompanyPortalData
