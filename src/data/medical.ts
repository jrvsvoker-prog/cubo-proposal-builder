/* Моки медицинского экрана («вариант дашборда») — русская версия референса
   boardui.com, пересобранная в визуальном ядре КП (серые карточки, белые
   внутренние блоки, акцент = primary клиента). */

export const MED_NAV = ['Показатели', 'Пациенты', 'Расписание', 'Медкарты', 'Отчёты']

export const MED_PATIENT = {
  name: 'Мертджан Эсмергюль',
  initials: 'МЭ',
  fields: [
    { id: 'dob', icon: 'calendar-event', label: 'Дата рождения', value: '28 июля 1997' },
    { id: 'gender', icon: 'gender-male', label: 'Пол', value: 'Мужской' },
    { id: 'blood', icon: 'droplet-half-2', label: 'Группа крови', value: 'A rh+' },
    { id: 'gp', icon: 'user-heart', label: 'Лечащий врач', value: 'Матеус Кларксон' },
  ],
}

export const MED_STEPS = {
  total: '31 600',
  period: '29 июн – 5 июл',
  days: [
    { day: 'Пн', value: 74 },
    { day: 'Вт', value: 26 },
    { day: 'Ср', value: 24 },
    { day: 'Чт', value: 68 },
    { day: 'Пт', value: 88 },
    { day: 'Сб', value: 58 },
    { day: 'Вс', value: 34 },
  ],
}

export const MED_SLEEP = {
  title: 'Отлично',
  period: '29 июн – 5 июл',
  score: 98,
  legend: [
    { id: 'duration', label: 'Длительность', hint: '7 ч 50 мин', score: '49/50', tone: 'feature' },
    { id: 'bedtime', label: 'Отбой', hint: 'на 20 мин раньше', score: '29/30', tone: 'primary' },
    { id: 'interrupt', label: 'Пробуждения', hint: '5 мин', score: '20/20', tone: 'info' },
  ],
}

export interface MedCalDay {
  day: number
  a: number // доли 0..1 трёх колец
  b: number
  c: number
  outside?: boolean
}

/* Июль 2026: 1 июля — среда (сетка Пн–Вс), 31 день. */
export const MED_CAL = {
  month: 'Июль',
  total: '32 459',
  selected: 10,
  days: [
    { day: 29, a: 0.5, b: 0.4, c: 0.6, outside: true },
    { day: 30, a: 0.7, b: 0.5, c: 0.7, outside: true },
    { day: 1, a: 0.9, b: 0.8, c: 1 },
    { day: 2, a: 0.85, b: 0.9, c: 0.7 },
    { day: 3, a: 0.6, b: 0.95, c: 0.9 },
    { day: 4, a: 0.7, b: 0.6, c: 0.8 },
    { day: 5, a: 0.55, b: 0.5, c: 0.65 },
    { day: 6, a: 0.8, b: 0.7, c: 0.9 },
    { day: 7, a: 0.65, b: 0.8, c: 0.75 },
    { day: 8, a: 0.9, b: 0.85, c: 0.95 },
    { day: 9, a: 0.75, b: 0.6, c: 0.8 },
    { day: 10, a: 1, b: 0.95, c: 0.9 },
    { day: 11, a: 0.45, b: 0.5, c: 0.6 },
    { day: 12, a: 0.5, b: 0.4, c: 0.55 },
    { day: 13, a: 0.6, b: 0.55, c: 0.7 },
    { day: 14, a: 0.7, b: 0.75, c: 0.65 },
    { day: 15, a: 0.55, b: 0.65, c: 0.8 },
    { day: 16, a: 0.85, b: 0.9, c: 0.95 },
    { day: 17, a: 0.4, b: 0.5, c: 0.6 },
    { day: 18, a: 0.65, b: 0.55, c: 0.75 },
    { day: 19, a: 0.75, b: 0.85, c: 0.8 },
    { day: 20, a: 0.9, b: 0.8, c: 0.85 },
    { day: 21, a: 0.6, b: 0.7, c: 0.9 },
    { day: 22, a: 0.5, b: 0.6, c: 0.7 },
    { day: 23, a: 0.8, b: 0.75, c: 0.85 },
    { day: 24, a: 0.7, b: 0.9, c: 0.95 },
    { day: 25, a: 0.65, b: 0.55, c: 0.7 },
    { day: 26, a: 0.55, b: 0.65, c: 0.75 },
    { day: 27, a: 0.85, b: 0.8, c: 0.9 },
    { day: 28, a: 0.95, b: 0.85, c: 1 },
    { day: 29, a: 0.6, b: 0.7, c: 0.8 },
    { day: 30, a: 0.75, b: 0.6, c: 0.7 },
    { day: 31, a: 0.8, b: 0.9, c: 0.85 },
    { day: 1, a: 0.4, b: 0.5, c: 0.6, outside: true },
    { day: 2, a: 0.5, b: 0.45, c: 0.55, outside: true },
  ] as MedCalDay[],
}

export const MED_ACTIVITY = {
  date: '10 июля 2026',
  rings: [
    { id: 'move', label: 'Движение', value: '816 ккал', tone: 'primary', pct: 0.86 },
    { id: 'exercise', label: 'Упражнения', value: '1 ч 41 мин', tone: 'feature', pct: 0.95 },
    { id: 'run', label: 'Бег', value: '5,2 км', tone: 'info', pct: 0.68 },
  ],
}

export const MED_ALERTS = {
  count: 12,
  period: '29 июн – 5 июл',
  items: [
    {
      id: 'heart',
      icon: 'heart-rate-monitor',
      tone: 'danger',
      title: 'Высокий пульс',
      date: '12 июня',
      text: 'Пульс поднялся выше 120 уд/мин, хотя вы были неактивны 10 минут начиная с 8:59, 12 июня.',
    },
    {
      id: 'medid',
      icon: 'id-badge-2',
      tone: 'warning',
      title: 'Медицинская карта',
      date: '9 июня',
      text: 'Экстренный контакт и данные об аллергиях обновлены в вашей медицинской карте.',
    },
  ],
}

export interface MedRow {
  id: string
  name: string
  initials: string
  admission: 'Амбулаторно' | 'Стационар'
  status: string
  statusTone: 'success' | 'danger' | 'warning' | 'muted'
  conditions: string[]
  next: string
}

export const MED_TABLE = {
  total: '540',
  rows: [
    { id: 'p1', name: 'Джон Кларксон', initials: 'ДК', admission: 'Амбулаторно', status: 'Восстановление', statusTone: 'success', conditions: ['Беременность', 'После операции'], next: '14 мая 2026' },
    { id: 'p2', name: 'Амелия Харт', initials: 'АХ', admission: 'Стационар', status: 'Критический', statusTone: 'danger', conditions: ['Кардиология'], next: '16 мая 2026' },
    { id: 'p3', name: 'Ноа Беннет', initials: 'НБ', admission: 'Амбулаторно', status: 'Стабильный', statusTone: 'muted', conditions: ['Ортопедия'], next: '18 мая 2026' },
    { id: 'p4', name: 'София Рейес', initials: 'СР', admission: 'Стационар', status: 'Наблюдение', statusTone: 'warning', conditions: ['Неврология'], next: '20 мая 2026' },
    { id: 'p5', name: 'Лиам О’Коннор', initials: 'ЛО', admission: 'Амбулаторно', status: 'Восстановление', statusTone: 'success', conditions: ['Дерматология'], next: '22 мая 2026' },
    { id: 'p6', name: 'Эмма Уилсон', initials: 'ЭУ', admission: 'Стационар', status: 'Критический', statusTone: 'danger', conditions: ['Кардиология', 'После операции'], next: '25 мая 2026' },
  ] as MedRow[],
}
