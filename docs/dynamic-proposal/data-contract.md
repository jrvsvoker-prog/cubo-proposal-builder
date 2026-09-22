# Контракт данных профиля

Типы: `src/data/profile-schema.ts` · Архетипы: `src/data/archetypes.json` · Валидатор: `scripts/profile.mjs`

## 1. Три слоя

| Слой | Кто пишет | Кто читает | Правило |
|---|---|---|---|
| **summary** | Агент по итогам ресёрча | Экраны, генератор, валидатор | Факты о компании: название, архетип, подразделения, бренд, выбор метрик |
| **generated** | Скрипт детерминированно (task-08) | Экраны | Демо-данные: лиды, счётчики, персонажи, суммы |
| **copy** | Шаблон с подстановкой | Экраны, страница КП | Тексты и подписи: hero, секции, footer, навигация |

## 2. Экран → поля профиля → слой

### 01 Дашборд (`dash-board-v3` + `dashboard-input.ts`)

| Поле | Слой |
|---|---|
| `business` | summary |
| `displayName` | summary |
| `name` | summary |
| `navigation` | copy |
| `staffInitials`, `staffName`, `staffRole` | summary |
| `units`, `unitSingular`, `unitPlural` | summary |
| `dashboard.scales`, `dashboard.defaultMetrics` | summary |
| `dashboard.monthlyDeals`, `dashboard.priceRange` | summary — генератор пишет их из `scale.monthlyDeals` и `offer.priceRange`; модель дашборда/аналитики использует их в расчётах |
| `dashboard.assumptions` | copy |
| `theme.primary` | summary |

### 02 Аналитика (`analytics-view` + `analytics.ts` + `analytics-copy.ts`)

| Поле | Слой |
|---|---|
| `business` | summary |
| `name` | summary |
| поля сайдбара — см. раздел «Сайдбар» | — |
| `units`, `unitSingular`, `unitPlural` | summary |
| `analyticsConfig.startMonth`, `currentYear`, `yearMonths` | summary — `currentYear` = последний завершённый учебный/календарный год относительно `demoDate` |
| `analyticsConfig.sources`, `directions`, `programs` | summary |
| `analyticsConfig.periodLabel`, `halfLabels` | copy |
| `analyticsConfig.revenueLabel`, `countLabel`, `averageLabel`, `itemsLabel` | copy |
| `analyticsConfig.directionLabel`, `programLabel`, `moneyNote` | copy |
| `theme.primary` | summary |

### 03 Карточка (`entity-card`)

Layout принят пользователем 11.09 и зафиксирован (коммит `769d330c`
монорепозитория). Состав свойств и данные меняются
через профиль; новая ниша не требует новой разметки карточки.

| Поле | Слой |
|---|---|
| `entity.name` — персонаж из сводки (`customer.entityExample`), тот же в 05 и 06 | summary |
| `entity.initials` — выводится из `name` | generated |
| `entity.actions` | generated |
| `entity.properties[]` — состав, порядок, `id`, `type` выбираются под нишу и клиента | summary |
| `entity.properties[].label` | copy |
| `entity.properties[].value`, `href` | generated |
| `entityScenario.users`, `events` | generated; `result` джоба с `screens` ∋ `03` — текст реплики клиента в истории (task-22) |
| поля сайдбара — см. раздел «Сайдбар» | — |
| `theme.primary` | summary |

### 04 Датавью (`data-views`)

| Поле | Слой |
|---|---|
| `leads[]` (все поля) | generated |
| `stageNames` | summary |
| `units` | summary |
| `unitSingular`, `unitPlural` | summary |
| `demoDate` | summary |
| `dataView.title`, `nameLabel`, `directionLabel`, `amountSuffix`, `nav`, `nextLabel` | copy |
| поля сайдбара — см. раздел «Сайдбар» | — |
| `theme.primary` | summary |

### 05 Подборки (`selection-demo`)

| Поле | Слой |
|---|---|
| `selectionCourses[].name`, `price` — позиции прайса из ресёрча | summary |
| `selectionCourses[].caption` | copy |
| `selectionCourses[].likes`, `dislikes`, `sent`, `liked` | generated |
| `massStats[].label` | copy |
| `massStats[].value` | generated |
| `selection.title`, `hint`, `description`, `contact`, `action` | copy |
| `selection.sender.*` | copy |
| `selection.massTitle`, `massHint`, `sentNote` | copy |
| `selection.initialLiked` | generated |
| `urls.selection`, `urls.selectionMass` | copy |
| `name`, `displayName` | summary |
| `logo` | summary |
| `theme.primary` | summary |

### 06 Кабинет (`client-portal`)

| Поле | Слой |
|---|---|
| `portal.login.*` | copy |
| `portal.parent.*` | generated |
| `portal.children[]` (name, caption, sub, status) | generated — `sub` и `status` из одного ключа стадии и её позиции среди четырёх |
| `portal.upcoming[].label`, `icon` | copy |
| `portal.upcoming[].name`, `caption` | generated; `result` джоба с `screens` ∋ `06` — подпись второго блока «Ближайшие», `name` = `entityExample.name` (task-22) |
| `portal.payment.items[]` | generated |
| `portal.chat.title`, `emptyTitle`, `emptyText`, `note` | copy |
| `portal.chat.peer`, `messages` | generated |
| `portalCopy.*` | copy |
| `urls.portal` | copy |
| `displayName` | summary |
| `logo` | summary |
| `theme.primary` | summary |

### Сайдбар (`screen-sidebar`)

Данные приходят через пропсы от каждого экрана 01–04 (05–06 без сайдбара):

| Поле | Слой |
|---|---|
| `name` (имя продукта рядом с маркером) | summary |
| `logo` — встроенный PNG/SVG; нет поля — буква из `name`/`initials` | summary |
| `staffInitials`, `staffName`, `staffRole` | summary |
| `navigation` (пункты меню) | copy |

### Рамка / лендинг (`app/index.tsx`)

| Поле | Слой |
|---|---|
| `brand.name`, `brand.site` | summary |
| `brand.note` | copy |
| `hero.*` | copy |
| `sections[]` | copy |
| `footer.*` | copy |
| `urls.*` | copy |
| `displayName` | summary |
| `theme.primary` | summary |
| `logo` | summary — маркеры экранов 01–06 и клиентская сторона пары «партнёр × клиент»; нет логотипа — буквенный fallback клиента |
| `logoCover` | summary — нет поля / `ink`: белый фильтр на обложке; `plate`: исходные цвета на светлой плашке |
| `partner?.name`, `partner?.logo` | summary — пара «партнёр × клиент»; RAND без `logo` (шаблонный SVG); `logo` только у другого интегратора |
| `hero.intro` | copy — интро о компании вместо `hero.subtitle` при наличии (task-21) |
| `estimate.*` | copy — необязательный коммерческий блок между главами и финалом; суммы — стоимость разработки Cubo, не цены бизнеса клиента (task-21) |

### Страница КП (`proposal-page`)

| Поле | Слой |
|---|---|
| `brand.name`, `brand.site` | summary |
| `brand.note` | copy |
| `hero.*` | copy |
| `sections[]` | copy |
| `footer.*` | copy |
| `displayName`, `name`, `units`, `unitPlural` | summary |
| `theme.primary` | summary |

### Стенд (`stand`)

Профиль напрямую не читает — получает собранные экраны.

## 3. Архетип

Файл: `src/data/archetypes.json`. Типы: `src/data/archetypes.ts`.

Архетип задаёт для каждого `business`: библиотеку метрик (`metrics`), масштабы периодов (`scales`), стадии по умолчанию (`stages`), сезонность (`seasonality`), конфигурацию аналитики (`analyticsPeriod`), параметры платежей (`payments`).

| Архетип | `fullProposal` | Потребители |
|---|---|---|
| `school` | ✅ | генератор (`dashboard-model.ts`), аналитика (`analytics.ts`), валидатор (`profile.mjs`) |
| `service` | ✅ | то же |
| `retail` | ❌ | генератор и стенд; профиля и валидации нет |

## 4. Поля без потребителей

Ни один экран их не читает. Удалять в этой задаче не решено — часть
зарезервирована пайплайном:

| Поле | Слой | Что с ним |
|---|---|---|
| `id` | summary | Не читается, но по LOGIC §5 slug компании — сид генератора (сейчас `dashboardInputFromProfile` берёт `seed: displayName`). Оставить; перевести сид на `id` — task-08 |
| `initials` | summary | Инициалы компании — буквенный fallback, если `logo` нет. Оставить |
| `logo` | summary | Data URI PNG/SVG из `company.brand.logo` относительно сводки. Нет поля — fallback. Абсолютный путь и URL не логотип |
| `portalCopy.payTitle` | copy | ~~Заголовок блока оплат~~ — **удалено 11.09** (task-10, волна A) |
| `analyticsConfig.salesCaption` | copy | ~~Подпись блока продаж~~ — **удалено 11.09** (task-10, волна A) |

`company.brand.logo` задаёт один файл клиента на все места.
Имя партнёра `RAND` всегда рисует шаблонный SVG; `proposal.partner.logo`
при этом имени запрещено. Чужой интегратор — своё имя и файл.
Поле `company.brand.coverPlate: true` включает светлую плашку только на
обложке, если инверсия портит цветной знак. Генератор не обрабатывает
пиксели. До генерации агент готовит файл по
[правилам логотипов](agent-runbook.md#логотип-клиента-и-партнёра).

**Выбор primary, 22.09:** в каждом новом запуске агент явно задаёт
`company.brand.primary` после обязательной проверки источников по
[runbook](agent-runbook.md#primary-и-монохромный-логотип). При отсутствии
подтверждённого акцента выбирает из согласованной палитры; без ориентиров —
`#0369a1`, с объяснением в `assumptions`. Источники и ход проверки хранятся
в `docs/dynamic-proposal/runs/<slug>/research.md`, новых полей профиля для них нет. Для старых
сводок поле остаётся технически необязательным, fallback генератора
`#4f46e5` сохранён. Генератор не проверяет достоверность исследования сайта.

**Подписи генератора, 22.09:** пустой `units.names` означает неуказанные
подразделения: глава 01 и фильтр 02 говорят о компании. `offer.itemNoun`
задаёт подписи предложения в 02/03/04; без него — «Предложение».
Следующие шаги в 04 выводятся из `deal.pipeline`. Типы обращений в 02 —
нейтральные первичное/повторное; тарифы и форматы обучения или работ из
названия архетипа не выводятся. Источники обращений — синтетические примеры,
не результат исследования каналов клиента. Смысл свободных вводных агент
сверяет отдельно по runbook; структурная валидация этого не гарантирует.

Тогда же по правилу Общ-1 (служебных демо-подписей внутри экранов нет) удалены
`selection.sentNote`, `portal.login.hint`, `portalCopy.paidNote`; добавлены
`portal.login.welcome` (copy, приветствие на экране входа) и
`portal.login.features[] { icon, label }` (copy, три пункта «что внутри»).
Пометка о демо остаётся один раз на страницу: `hero.kicker`, `footer.note`,
`footer.disclaimer`.

**Изменение 21.09 (task-21):** пометки о демоданных убраны из оболочки по решению
пользователя — верхняя плашка «Демонстрационные данные», оглавление и пояснение
внизу не выводятся; `footer.disclaimer` сохранён в схеме как опциональный,
но оболочкой не читается. Новые поля оболочки в сводке: `proposal.intro`,
`proposal.partner { name, logo? }` (логотип — по тем же правилам, что
`company.brand.logo`), `proposal.estimate { title?, text?, rate?, items[], total? }`.
Без `proposal.estimate` генератор подставляет принятую базу из
`src/data/estimate-defaults.json`; переданная смета заменяет её целиком, без
смешивания. При заданном `rate` суммы позиций обязаны сходиться с
`hours × rate` — один источник расчёта, противоречия отклоняются валидатором.

**Изменение 21.09 (task-22):** необязательный блок `jobs` в сводке. Формат:

```
jobs {
  main: string                    // главный джоб — внутреннее поле карты, в профиль не пишется
  roles: [                        // 1–4 роли, включая клиента клиента при необходимости
    {
      role: string,
      stories: [                  // 1–3 истории «когда / хочу / чтобы»
        {
          when: string, want: string, so: string,
          metrics?: string[],     // только id из archetypes[archetype].metrics
          screens?: string[],     // подмножество '01'..'06'
          result?: string         // наблюдаемый результат; выводится на экранах 03/06
        }
      ]
    }
  ]
}
```

Правила генератора:

- `metrics` поднимаются в начало `dashboard.defaultMetrics` в порядке упоминания,
  остальные базовые метрики архетипа следуют за ними. Метрики вне библиотеки
  архетипа (включая чужого архетипа) отклоняются валидатором сводки до записи
  профиля — существующий файл не перезаписывается.
- Предела «ровно четыре» KPI нет: поддержанные метрики идут в порядке первого
  упоминания (повторы считаются один раз), затем отсутствующие базовые метрики
  в исходном порядке архетипа. Одна дополнительная метрика `average` на
  service даёт пять карточек `["average","revenue","orders","ontime","load"]`.
  При пяти–шести карточках проверь их читаемость в браузере (1440/1024/390);
  не подменяй выбор клиента дефолтными метриками ради сетки.
- `screens` фиксирует, на каком из шести экранов джоб живёт; неподдержанный номер
  отклоняется валидатором. Новые экраны джобы не порождают.
- `result` — видимый результат истории. Экран 03 → реплика клиента в истории
  карточки (`entityScenario.events`), экран 06 → второй блок «Ближайшие» портала
  (`portal.upcoming[1]`: `caption` = `result`, `name` = `entityExample.name`).
  Для экранов 01/02/04/05 отдельного слота нет — `result` с такими `screens`
  не выводится и вызывает предупреждение генератора. Первая по порядку история
  на слот выигрывает; конфликт логируется.
- `jobs.main` и формулировки `when/want/so` — внутренний артефакт карты джобов;
  в готовый профиль не переносятся (проверено побайтовой идентичностью при
  изменении только `main`).
- Валидация `jobs` целиком в `validateSummary`: тексты обязательных полей,
  метрики из библиотеки архетипа, экраны 01–06, `result` — непустой текст.
  Ошибка = exit≠0 до записи, существующий профиль не портится.

Карта «роль → джоб → экран → поле сводки → поле профиля → видимый результат»:
`docs/dynamic-proposal/reviews/remaining-mvp/task-22/jobs-map.md`.

**Изменение 21.09 (task-15):** доказанные границы ввода, проверенные прогонами
(`reviews/remaining-mvp/task-15/`):

- `offer.priceRange` — пара `[min, max]` с `min ≤ max`; обратный диапазон,
  отрицательные значения и не-пары отклоняются валидатором. Равные значения
  допустимы (фиксированная цена). Округление до сотен и минимум 100 ₽ не
  выводят показываемые суммы за пределы диапазона — значения зажимаются
  в `[min, max]` после округления.
- `time.demoDate` и `customer.entityExample.dueDate` — `YYYY-MM-DD` и реальная
  дата: `2026-13-40`, `2026-02-30` отклоняются до записи.
- Морфология выводится из входных существительных, не зашита: множественное
  число (`units.kind`, `deal.noun`), датив («по поставке», «заказчику»),
  родительный в слотах, род у «Создан/Создана/Создано». Нестандартные слова
  («Площадка», «Поставка») склоняются по правилам, таблица исключений —
  только для нерегулярных форм. Многословная фраза («Заказ поставки»)
  склоняется по первому слову — главному существительному: «по заказу
  поставки», «Заказы поставки в работе».
- Имя компании уже в кавычках второй парой не оборачивается
  («Снаб» → ««Снаб»» запрещено).
- Инициалы берут первую букву/цифру каждого слова: кавычки, скобки и `№`
  в начало инициалов не попадают («Снаб» → «С», «Гелиос» → «Г»).
- Инвариант `selectionCourses[].likes ≤ sent` сохраняется при любом числе
  позиций прайса (проверено до 12 услуг).
- `archetype` принимает только `school` и `service` — `retail` из
  `archetypes.json` пока не поддерживается генератором (библиотека есть,
  входного слова нет).
- Одинаковый `slug` у двух сводок — перезапись профиля по умолчанию
  (регенерация — штатный режим; защита от случайного совпадения — через
  git diff, отдельного флага нет).

## 5. Спорные отнесения и расхождения

- **`entity.properties`** — с 11.09 заменяет `chips`, `now`, `contacts`, `groups` в карточке. Состав и порядок задаёт профиль, число свойств не фиксировано. У свойства непустые `id`, `label`, `value`; `type` — `text` по умолчанию, `status` или `link`. Для ссылки обязателен `href` с HTTPS, tel или mailto. Даты, суммы и имена — подготовленный текст; отдельные отраслевые блоки не нужны. Генератор: `subject` не совпадает с `offer.items`; телефон — демо-номер по slug, не нули; одна точка или `entityExample.unit` даёт свойство подразделения; `entityExample.fields` добавляет факты бизнеса. `chips` по-прежнему не читается.
- **`stageNames` и `archetype.stages`** — стадии архетипа — это значение по умолчанию для будущего генератора сводки (LOGIC §3), профиль вправе их переопределить: `service.json` использует «Новая → Диагностика → Согласование → В работе», архетип предлагает «Заявка → Диагностика → В работе → Готово». Проверка равенства намеренно не добавлена.
- **`entity.properties[].label`** — copy (подпись поля), хотя в генераторе label и value будут писаться вместе.
- **`selectionCourses[].name` / `price`** — summary: позиции прайса берутся из ресёрча (`offer.items`, `priceRange`), `caption` — copy.
- **Формулы генерации** (`dashboard-model.ts`, ветки `business==='school'` в `monthlyRaw`/`raw`) — оставлены: сырые счётчики у архетипов разные (occupied/capacity/billed у школы, due/ontime/hours у сервиса), вынос в данные потребовал бы переписать формулы. Новый архетип с иным набором счётчиков = ветка в генераторе.
- **`dashboard.monthlyDeals` / `dashboard.priceRange`** — если заданы, модель дашборда и аналитика берут объём всей компании за последний завершённый демо-месяц и прайс из сводки. Подразделения делят объём, не умножают его. KPI не считаются из 12 примеров Data View. При фиксированной цене средний чек равен ей, выручка = закрытые × цена. Без этих полей старые профили сохраняют прежние числа.
- **Закрытые периоды** — месяц/год/неделя/день и `analyticsConfig.currentYear` выводятся из `demoDate`, без живого календаря. Старые профили без новых полей масштаба сохраняют принятые числа; при той же сентябрьской дате набор периодов совпадает с прежним 2026-08.
- **Прогресс главной сущности** — статус карточки, связанной записи, истории и кабинета считаются из ключа стадии и её индекса среди четырёх. Завершение не угадывается по русскому слову.
- **`units.names=[]`** — в тексте допущений нет ложного «Подразделения: 1»; показатели считаются по всей компании.
- **Литеральные union-типы** (`PortalTone`, `PortalPayState`, `PortalMessage.from`, `ScenarioEvent.type`, `EntityProperty.type`) в схеме записаны как `string` — JSON не несёт литеральных типов; в `company.ts` сужены кастом для компонентов. Валидатор проверяет типы событий и свойств, уникальные id свойств и допустимые ссылки.
- **Статический `<title>` в `index.html`** нёс «школа «Среда»» в сборку сервиса (найдено грепом на утечку) — заменён на нейтральный «Cubo — коммерческое предложение»; `document.title` ставится из профиля при монтировании.

## 6. Правила для следующих задач

1. **Экран (task-10)** читает только поля из своей строки таблицы выше. Новое поле = сначала правка этого документа и `profile-schema.ts`, потом код.
2. **Генератор (task-08)** пишет слой `generated`, агент — `summary`, шаблоны — `copy`. Персонаж (`entity.name`) один на 03 → 05 → 06.
3. Новый архетип = запись в `archetypes.json` (валидатор и метрики дашборда подхватывают сами) + ветка сырых счётчиков в `dashboard-model.ts`, если набор счётчиков отличается.
4. Новый профиль проходит `validateProfile()` и `satisfies ProposalProfile` (файл `profiles.typecheck.ts`) до сборки.
