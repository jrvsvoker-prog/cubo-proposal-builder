import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { CuboIcon } from '@cuboapp/ui-vue'
import { brand, hero, sections, profile, type SectionCopy } from '../data/company'
import { applyClientPrimary } from '../utils/primary-ink'
import { heroStats, type HeroStat } from './utils/hero-stats'
import Estimate from './estimate'
import ClientBrand from '../components/client-brand'
import ScreenFrame from '../components/screen-frame'
import DashBoardV3 from '../components/dash-board-v3'
import AnalyticsView from '../components/analytics-view'
import EntityCard from '../components/entity-card'
import DataViews from '../components/data-views'
import SelectionDemo from '../components/selection-demo'
import ClientPortal from '../components/client-portal'
import randLogoSvg from '../assets/brands/rand-logo.svg?raw'

const screenUrls = profile.urls
const randMark = randLogoSvg.replace(/<\?xml[^?]*\?>/, '').trim()
const isRandPartner = (name: string) => name.trim().toLowerCase() === 'rand'

export default defineComponent({
  name: 'ShowcaseLanding',
  setup() {
    applyClientPrimary(profile.theme.primary)
    const { stats, period, series } = heroStats()
    const chartMax = Math.max(...series.map(point => point.value), 1)
    const coverArt = ref<HTMLElement>()
    const footerArt = ref<HTMLElement>()
    let motionQuery: MediaQueryList | undefined
    let artObserver: IntersectionObserver | undefined
    let scrollFrame = 0
    const visibleArt = new Set<HTMLElement>()

    const updateMotion = () => {
      for (const art of [coverArt.value, footerArt.value]) {
        if (art) art.classList.toggle('is-moving', visibleArt.has(art) && !document.hidden && !motionQuery?.matches)
      }
      if (motionQuery?.matches) coverArt.value?.style.removeProperty('--kp-drift')
    }
    const onScroll = () => {
      if (motionQuery?.matches || !coverArt.value || !visibleArt.has(coverArt.value) || scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        coverArt.value?.style.setProperty('--kp-drift', `${Math.min(window.scrollY * .1, 36)}px`)
      })
    }

    onMounted(() => {
      document.title = `Cubo · ${profile.displayName}`
      // Телепортированные панели кита (селекты, попапы) улетают в body — мимо
      // cubo-client-theme экранов, и акценты в них остаются синими. Лендинг
      // однопрофильный, так что тему клиента вешаем на body.
      document.body.classList.add('cubo-client-theme')
      document.body.setAttribute('data-cubo-gtc-bridge', '')
      document.body.setAttribute('data-gtc-theme', 'light')
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      artObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const art = entry.target as HTMLElement
          if (entry.isIntersecting) {
            visibleArt.add(art)
            art.classList.add('is-entered')
          } else visibleArt.delete(art)
        }
        updateMotion()
        onScroll()
      })
      for (const art of [coverArt.value, footerArt.value]) if (art) artObserver.observe(art)
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('visibilitychange', updateMotion)
      motionQuery.addEventListener('change', updateMotion)
    })
    onBeforeUnmount(() => {
      artObserver?.disconnect()
      cancelAnimationFrame(scrollFrame)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', updateMotion)
      motionQuery?.removeEventListener('change', updateMotion)
    })

    const renderDelta = (stat: HeroStat) => stat.delta && <span class={['delta-pill', stat.good === true ? 'is-up' : stat.good === false ? 'is-down' : 'is-zero']}>{stat.delta}</span>
    const renderBars = () => (
      <div class="showcase-preview__bars" role="img" aria-label={`${stats[0].label} за 12 месяцев: ${series.map(point => `${point.label}: ${point.value.toLocaleString('ru-RU')} ₽`).join('; ')}`}>
        {series.map((point, i) => <i key={point.label} class={{ 'is-current': i === series.length - 1 }} style={{ height: `${point.value / chartMax * 100}%`, animationDelay: `${160 + i * 45}ms` }} title={`${point.label}: ${point.value.toLocaleString('ru-RU')} ₽`} />)}
      </div>
    )

    const sectionBody = (section: SectionCopy) => {
      switch (section.id) {
        case 'overview':
          return (
            <ScreenFrame key={section.id} url={screenUrls.overview}>
              <DashBoardV3 />
            </ScreenFrame>
          )
        case 'analytics':
          return (
            <ScreenFrame key={section.id} url={screenUrls.analytics}>
              <AnalyticsView />
            </ScreenFrame>
          )
        case 'entity':
          return (
            <ScreenFrame key={section.id} url={screenUrls.entity}>
              <EntityCard />
            </ScreenFrame>
          )
        case 'dataview':
          return (
            <ScreenFrame key={section.id} url={screenUrls.dataview}>
              <DataViews />
            </ScreenFrame>
          )
        case 'selection':
          return <SelectionDemo key={section.id} />
        case 'portal':
          return <ClientPortal key={section.id} />
        default:
          return null
      }
    }

    return () => (
      <div class="showcase cubo-client-theme" data-cubo-gtc-bridge data-gtc-theme="light" data-gtc-size="medium">
        <div class="showcase-cover">
        <header class="showcase-header">
          <div class="showcase-shell showcase-header__in">
            <span class="showcase-header__brand">
              {profile.partner ? (
                <>
                  {isRandPartner(profile.partner.name)
                    ? <span class="showcase-header__logo showcase-header__logo--partner" aria-label={profile.partner.name} innerHTML={randMark} />
                    : profile.partner.logo
                      ? <img class="showcase-header__logo showcase-header__logo--partner" src={profile.partner.logo} alt={profile.partner.name} />
                      : <span class="showcase-header__partner">{profile.partner.name}</span>}
                  <span class="showcase-header__times" aria-hidden="true">×</span>
                  {profile.logo
                    ? <img class={['showcase-header__logo', profile.logoCover === 'plate' && 'showcase-header__logo--plate']} src={profile.logo} alt={profile.name} />
                    : <span class="showcase-header__mark" aria-hidden="true"><ClientBrand letter={profile.name} /></span>}
                </>
              ) : (
                profile.logo
                  ? <img class={['showcase-header__logo', profile.logoCover === 'plate' && 'showcase-header__logo--plate']} src={profile.logo} alt={profile.name} />
                  : <><i aria-hidden="true" />{brand.name}</>
              )}
            </span>
            <span class="showcase-header__note">{brand.note}</span>
          </div>
        </header>

          <section class="showcase-hero">
            <div class="showcase-shell showcase-hero__grid">
              <div class="showcase-hero__intro">
              <h1 class="showcase-hero__title">
                {hero.titleLines[0]}
                <br />
                {hero.titleLines[1]}
              </h1>
              <p class="showcase-hero__sub">{hero.intro || hero.subtitle}</p>
              <a class="showcase-cta" href="#s-overview">
                {hero.cta}
                <CuboIcon icon="arrow-down" size={16} aria-hidden="true" />
              </a>
              </div>
              <div class="showcase-artifact" ref={coverArt}>
              <div class="showcase-artifact__ghost" aria-hidden="true" />
              <aside class="showcase-preview" aria-label="Краткий обзор показателей">
                {profile.units.length > 0 && <span class="showcase-preview__units">{profile.unitPlural} · {profile.units.length}</span>}
                <header class="showcase-preview__head">
                  <span><i aria-hidden="true" />{profile.name}</span>
                  <small>Демо</small>
                </header>
                <p class="showcase-preview__label">{stats[0].label} · {period}</p>
                <div class="showcase-preview__value">
                  <b>{stats[0].value}</b>
                  {renderDelta(stats[0])}
                </div>
                {renderBars()}
                <p class="showcase-preview__range">{series[0].label} – {series[series.length - 1].label}</p>
                <div class="showcase-preview__foot">
                  {stats.slice(1).map(stat => <span key={stat.label}><b>{stat.value}</b>{stat.label}</span>)}
                </div>
              </aside>
              </div>
            </div>
          </section>
        </div>

        <main>
          {sections.map((section) => (
            <div key={section.id}>
            {section.id === 'selection' && <div class="showcase-shell showcase-group"><span>Для ваших клиентов</span></div>}
            <section class="showcase-section" id={`s-${section.id}`} key={section.id}>
              <div class="showcase-shell">
                <header class="showcase-section__head">
                  <p class="showcase-section__kicker">
                    <span class="showcase-section__num">{section.num}</span>
                    {section.kicker}
                  </p>
                  <h2 class="showcase-section__title">{section.title}</h2>
                  <p class="showcase-section__sub">{section.subtitle}</p>
                  <ul class="showcase-section__meta">{section.meta.map(item => <li key={item}><span class="showcase-section__check" aria-hidden="true"><CuboIcon icon="check" size={12} /></span>{item}</li>)}</ul>
                </header>
                <div class="showcase-section__screen">{sectionBody(section)}</div>
              </div>
            </section>
            </div>
          ))}
        </main>

        {profile.estimate && <Estimate estimate={profile.estimate} />}

        <footer class="showcase-footer">
          <div class="showcase-shell">
            <div class="showcase-footer__panel">
            <div class="showcase-footer__grid">
            <div class="showcase-footer__cta">
              <p class="showcase-hero__kicker">{profile.displayName}</p>
              <h2>{profile.footer.title}</h2>
              <p>{profile.footer.text}</p>
              <a class="showcase-cta" href={profile.footer.url} target="_blank" rel="noreferrer">
                {profile.footer.cta}
                <CuboIcon icon="arrow-up-right" size={16} aria-hidden="true" />
              </a>
            </div>
            <div class="showcase-footer__art" ref={footerArt} aria-hidden="true">
              {stats.map((stat, i) => (
                <div class={['showcase-mini', { 'showcase-mini--chart': i === 0 }]} key={stat.label}>
                  <p class="showcase-preview__label">{stat.label} · {period}</p>
                  <div class="showcase-preview__value"><b>{stat.value}</b>{renderDelta(stat)}</div>
                  {i === 0 && renderBars()}
                </div>
              ))}
            </div>
            </div>
            <div class="showcase-footer__line">
              <span>© 2026 {profile.partner?.name.trim() || 'RAND'} · {profile.footer.note}</span>
            </div>
            </div>
          </div>
        </footer>
      </div>
    )
  },
})
