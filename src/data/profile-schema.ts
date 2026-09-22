/**
 * Контракт данных профиля компании.
 *
 * Каждое листовое поле помечено слоем:
 *   summary   — факты о компании (пишет агент по итогам ресёрча)
 *   generated — демо-данные (должен производить скрипт детерминированно)
 *   copy      — тексты страницы КП и подписи (шаблон с подстановкой)
 *
 * JSON-профили (`profiles/school.json`, `profiles/service.json`) должны
 * соответствовать этому типу без изменений.
 */

// ---------------------------------------------------------------------------
// Вложенные типы
// ---------------------------------------------------------------------------

/** смешанный: name и site — факты о компании, note — подпись шапки */
export interface BrandInfo {
  /** слой: summary */ name: string
  /** слой: copy */ note: string
  /** слой: summary */ site: string
}

/** слой: summary */
export interface ThemeInfo {
  /** слой: summary */ primary: string
}

/** слой: summary — встроенный PNG/SVG клиента; нет поля — буквенный fallback */
export type ClientLogo = string

/** слой: copy */
export interface HeroInfo {
  /** слой: copy */ kicker: string
  /** слой: copy */ titleLines: string[]
  /** слой: copy */ subtitle: string
  /** слой: copy */ cta: string
  /** слой: copy — короткое интро о компании на обложке; заменяет subtitle при наличии */ intro?: string
}

/** слой: copy — партнёр слева в паре «партнёр × клиент» на обложке */
export interface PartnerInfo {
  /** слой: copy */ name: string
  /** слой: summary — встроенный PNG/SVG только если партнёр не RAND; RAND рисует шаблон */ logo?: ClientLogo
}

/**
 * Позиция коммерческой оценки. Суммы — стоимость разработки Cubo,
 * не цены бизнеса клиента. Без `to` позиция трактуется как «от from».
 */
export interface EstimateItem {
  /** слой: copy */ id: string
  /** слой: copy */ title: string
  /** слой: copy */ hoursFrom?: number
  /** слой: copy */ hoursTo?: number
  /** слой: copy */ from: number
  /** слой: copy */ to?: number
}

/** слой: copy — необязательный коммерческий блок страницы */
export interface EstimateInfo {
  /** слой: copy */ title: string
  /** слой: copy — пояснение: оценки ориентировочные, итог зависит от объёма */ text: string
  /** слой: copy — ставка ₽/час, если суммы посчитаны от часов */ rate?: number
  /** слой: copy */ items: EstimateItem[]
  /** слой: copy — отдельная общая оценка; отсутствие не выводится из позиций */ total?: { from: number; to?: number }
}

/** слой: copy */
export interface SectionCopy {
  /** слой: copy */ id: string
  /** слой: copy */ num: string
  /** слой: copy */ kicker: string
  /** слой: copy */ title: string
  /** слой: copy */ subtitle: string
  /** слой: copy */ meta: string[]
}

// -- Entity (03 карточка) — смешанный: summary + generated + copy -----------

/** Одно свойство карточки; состав и порядок задаёт профиль клиента. */
export interface EntityProperty {
  /** слой: summary — стабильный ключ */ id: string
  /** слой: copy */ label: string
  /** слой: generated — готовое к показу значение, допускает переносы строк */ value: string
  /** слой: summary — text (по умолчанию), status или link; проверяет валидатор. string для JSON. */ type?: string
  /** слой: generated — только для link: https, tel или mailto */ href?: string
}

export interface EntityActions {
  /** слой: generated */ call: string
  /** слой: generated */ task: string
}

/** Смешанный: summary (структура), generated (значения), copy (подписи) */
export interface EntityInfo {
  /** слой: summary — персонаж из сводки (LOGIC §2.3 customer.entityExample); тот же человек в 05 и 06 */ name: string
  /** слой: generated — выводится из name */ initials: string
  /** слой: generated */ actions: EntityActions
  /** смешанный — состав и порядок выбираются под нишу и клиента */ properties: EntityProperty[]
}

// -- Leads (04 датавью) -----------------------------------------------------

export type LeadStage = string

export interface Lead {
  /** слой: generated */ id: string
  /** слой: generated */ child: string
  /** слой: generated */ initials: string
  /** слой: generated */ direction: string
  /** слой: generated */ branch: string
  /** слой: generated */ stage: LeadStage
  /** слой: generated */ amount: number
  /** слой: generated */ next: string
  /** слой: generated */ created: string
}

// -- Selection (05 подборки) ------------------------------------------------

export interface SelectionCourse {
  /** слой: generated */ id: string
  /** слой: summary */ name: string
  /** слой: copy */ caption: string
  /** слой: summary */ price: string
  /** слой: generated */ liked: boolean
  /** слой: generated */ likes: number
  /** слой: generated */ dislikes: number
  /** слой: generated */ sent: number
}

export interface MassStat {
  /** слой: copy */ label: string
  /** слой: generated */ value: number
}

/** слой: copy */
export interface SelectionSender {
  /** слой: copy */ name: string
  /** слой: copy */ role: string
  /** слой: copy */ action: string
  /** слой: copy */ massAction: string
}

/** Смешанный: copy (тексты) + generated (initialLiked) */
export interface SelectionInfo {
  /** слой: copy */ title: string
  /** слой: copy */ hint: string
  /** слой: copy */ description: string
  /** слой: copy */ sender: SelectionSender
  /** слой: copy */ contact: string
  /** слой: copy */ action: string
  /** слой: copy */ massTitle: string
  /** слой: copy */ massHint: string
  /** слой: generated — определяется скриптом при генерации */ initialLiked: string[]
}

// -- Portal (06 кабинет) ----------------------------------------------------

export type PortalTone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral'
export type PortalPayState = 'due' | 'overdue' | 'paid'

export interface PortalSub {
  /** слой: generated */ used: number
  /** слой: generated */ total: number
  /** слой: generated */ text: string
  /** слой: generated */ until?: string
}

export interface PortalItem {
  /** слой: generated */ name: string
  /** слой: generated */ caption: string
  /** слой: generated */ sub?: PortalSub
  /** слой: generated */ status?: { label: string; tone: string }
}

export interface PortalStripItem {
  /** слой: copy */ label: string
  /** слой: generated */ name: string
  /** слой: generated */ caption: string
  /** слой: copy */ icon?: string
}

export interface PortalPayment {
  /** слой: generated */ id: string
  /** слой: generated */ label: string
  /** слой: generated */ amount: string
  /** слой: generated */ date: string
  /** слой: generated */ state: string
}

export interface PortalMessage {
  /** слой: generated */ id: string
  /** слой: generated */ from: string
  /** слой: generated */ text: string
  /** слой: generated */ time: string
  /** слой: generated */ day: string
}

export interface PortalPeer {
  /** слой: generated */ name: string
  /** слой: generated */ role: string
  /** слой: generated */ initials: string
  /** слой: generated */ status: string
}

/** Смешанный: copy (login, chat.title/emptyTitle/emptyText/note) + generated */
export interface PortalData {
  /** слой: copy */ login: {
    /** слой: copy */ title: string
    /** слой: copy */ email: string
    /** слой: copy */ welcome: string
  }
  /** слой: generated */ parent: { name: string; initials: string }
  /** слой: generated */ children: PortalItem[]
  /** слой: generated */ upcoming: PortalStripItem[]
  /** слой: generated */ payment: { items: PortalPayment[] }
  /** Смешанный: copy (title/emptyTitle/emptyText) + generated (peer/messages) */
  chat: {
    /** слой: copy */ title: string
    /** слой: generated */ peer: PortalPeer
    /** слой: generated */ messages: PortalMessage[]
    /** слой: copy */ emptyTitle: string
    /** слой: copy */ emptyText: string
  }
}

/** слой: copy */
export interface PortalCopyInfo {
  /** слой: copy */ mark: string
  /** слой: copy */ itemsTitle: string
  /** слой: copy */ historyTitle: string
  /** слой: copy */ greeting: string
  /** слой: copy */ dateLabel: string
  /** слой: copy */ billAction: string
  /** слой: copy */ billTitle: string
  /** слой: copy */ billText: string
  /** слой: copy */ dueLabel: string
  /** слой: copy */ allPaidLabel: string
}

// -- EntityScenario (03 таймлайн) -------------------------------------------

export interface ScenarioUser {
  /** слой: generated */ id: string
  /** слой: generated */ name: string
  /** слой: generated */ role: string
}

export interface ScenarioEvent {
  /** слой: generated */ id: string
  /** слой: generated */ type: string
  /** слой: generated */ text: string
  /** слой: generated */ hours: number
  /** слой: generated */ authorId: string
  /** слой: generated */ done: boolean
}

/** слой: generated */
export interface EntityScenarioInfo {
  /** слой: generated */ users: ScenarioUser[]
  /** слой: generated */ events: ScenarioEvent[]
}

// -- Dashboard config -------------------------------------------------------

/** Смешанный: summary (defaultMetrics/scales) + copy (assumptions) */
export interface DashboardConfig {
  /** слой: summary */ defaultMetrics: string[]
  /** слой: summary */ scales: string[]
  /** слой: copy */ assumptions: string
  /** слой: summary — опционально: объём всей компании за последний завершённый демо-месяц */ monthlyDeals?: number
  /** слой: summary — опционально: [min, max] прайса; при равенстве средний чек равен этой цене */ priceRange?: number[]
}

// -- DataView config --------------------------------------------------------

/** слой: copy */
export interface DataViewConfig {
  /** слой: copy */ title: string
  /** слой: copy */ nameLabel: string
  /** слой: copy */ directionLabel: string
  /** слой: copy */ amountSuffix: string
  /** слой: copy */ nav: string[]
  /** слой: copy */ nextLabel: string
}

// -- Analytics config -------------------------------------------------------

/** Смешанный: summary (sources/directions/programs, yearMonths/startMonth/currentYear) + copy (labels) */
export interface AnalyticsConfig {
  /** слой: summary */ startMonth: number
  /** слой: summary */ currentYear: number
  /** слой: summary */ yearMonths: number
  /** слой: copy */ periodLabel: string
  /** слой: copy */ halfLabels: string[]
  /** слой: summary */ directions: string[]
  /** слой: summary */ programs: string[]
  /** слой: summary */ sources: string[]
  /** слой: copy */ revenueLabel: string
  /** слой: copy */ countLabel: string
  /** слой: copy */ averageLabel: string
  /** слой: copy */ itemsLabel: string
  /** слой: copy */ directionLabel: string
  /** слой: copy */ programLabel: string
  /** слой: copy */ moneyNote: string
}

// -- Footer -----------------------------------------------------------------

/** слой: copy */
export interface FooterInfo {
  /** слой: copy */ title: string
  /** слой: copy */ text: string
  /** слой: copy */ cta: string
  /** слой: copy */ url: string
  /** слой: copy */ note: string
  /** слой: copy — устарело, в оболочке не выводится (решение 21.09) */ disclaimer?: string
}

// -- URLs -------------------------------------------------------------------

/** слой: copy */
export interface UrlsInfo {
  /** слой: copy */ overview: string
  /** слой: copy */ analytics: string
  /** слой: copy */ entity: string
  /** слой: copy */ dataview: string
  /** слой: copy */ selection: string
  /** слой: copy */ selectionMass: string
  /** слой: copy */ portal: string
}

// ---------------------------------------------------------------------------
// Корневой интерфейс
// ---------------------------------------------------------------------------

export interface ProposalProfile {
  // -- summary (верхний уровень) --
  /** слой: summary */ id: string
  /** слой: summary */ name: string
  /** слой: summary */ displayName: string
  /** слой: summary */ initials: string
  /** слой: summary */ staffInitials: string
  /** слой: summary */ staffName: string
  /** слой: summary */ staffRole: string
  /** слой: summary */ business: string
  /** слой: summary */ units: string[]
  /** слой: summary */ unitSingular: string
  /** слой: summary */ unitPlural: string
  /** слой: summary */ demoDate: string
  /** слой: summary */ theme: ThemeInfo
  /**
   * слой: summary — data URI `image/png` или `image/svg+xml`.
   * Нет поля: буквенный маркер. Не путать с `brand.name` (это Cubo).
   */
  logo?: ClientLogo
  /**
   * слой: summary — как показать клиентский знак на тёмной обложке.
   * Нет поля / `ink`: белый через фильтр, без плашки.
   * `plate`: исходные цвета на светлой плашке, если инверсия портит знак.
   */
  logoCover?: 'ink' | 'plate'
  /** слой: summary — ключи стадий определяются архетипом */ stageNames: Record<string, string>

  // -- copy (верхний уровень) --
  /** слой: copy */ brand: BrandInfo
  /** слой: copy */ hero: HeroInfo
  /** слой: copy — нет партнёра: шапка показывает только Cubo */ partner?: PartnerInfo
  /** слой: copy — нет оценки: блок не показывается (старые профили валидны) */ estimate?: EstimateInfo
  /** слой: copy */ sections: SectionCopy[]
  /** слой: copy */ footer: FooterInfo
  /** слой: copy */ urls: UrlsInfo
  /** слой: copy */ navigation: string[]
  /** слой: copy */ portalCopy: PortalCopyInfo
  /** слой: copy */ dataView: DataViewConfig

  // -- generated (верхний уровень) --
  /** слой: generated */ leads: Lead[]
  /** слой: generated */ massStats: MassStat[]

  // -- смешанные (слой на уровне полей) --
  /** смешанный: summary (структура свойств), generated (значения), copy (подписи) */ entity: EntityInfo
  /** смешанный: summary (defaultMetrics/scales) + copy (assumptions) */ dashboard: DashboardConfig
  /** смешанный: summary (sources/directions/programs, yearMonths/startMonth/currentYear) + copy (labels) */ analyticsConfig: AnalyticsConfig
  /** смешанный: copy (тексты) + generated (initialLiked) */ selection: SelectionInfo
  /** смешанный: summary (name/price) + copy (caption) + generated (likes/sent/liked) */ selectionCourses: SelectionCourse[]
  /** смешанный: copy (login, chat titles, note) + generated (parent, children, upcoming, payment, chat.peer, messages) */ portal: PortalData
  /** слой: generated */ entityScenario: EntityScenarioInfo
}

// ---------------------------------------------------------------------------
// «Взгляды» по слоям (ключи верхнего уровня, которые целиком одного слоя)
// ---------------------------------------------------------------------------

/** Ключи профиля, целиком относящиеся к слою summary */
export type ProfileSummary = Pick<ProposalProfile,
  'id' | 'name' | 'displayName' | 'initials' | 'staffInitials' | 'staffName' | 'staffRole' |
  'business' | 'units' | 'unitSingular' | 'unitPlural' | 'demoDate' | 'theme' | 'logo' | 'stageNames'
>

/** Ключи профиля, целиком относящиеся к слою generated */
export type ProfileGenerated = Pick<ProposalProfile,
  'leads' | 'massStats' | 'entityScenario'
>

/** Ключи профиля, целиком относящиеся к слою copy */
export type ProfileCopy = Pick<ProposalProfile,
  'brand' | 'hero' | 'sections' | 'footer' | 'urls' | 'navigation' | 'portalCopy' | 'dataView'
>

/*
 * Смешанные ключи (слой на уровне полей, не целиком одного слоя):
 *   entity, dashboard, analyticsConfig, selection, selectionCourses, portal
 */
