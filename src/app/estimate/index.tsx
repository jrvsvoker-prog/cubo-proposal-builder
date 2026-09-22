import { defineComponent, type PropType } from 'vue'
import { CuboIcon, type CuboIconName } from '@cuboapp/ui-vue'
import type { EstimateInfo, EstimateItem } from '../../data/profile-schema'
import { estimateIcons, money, priceLabel } from '../utils/format-money'

const iconOf = (item: EstimateItem) => (estimateIcons[item.id] ?? 'layout-grid') as CuboIconName

/**
 * Коммерческий блок КП: ориентировочная стоимость разработки Cubo.
 * Не путать с демонстрационными ценами бизнеса клиента внутри экранов.
 */
export default defineComponent({
  name: 'Estimate',
  props: {
    estimate: { type: Object as PropType<EstimateInfo>, required: true },
  },
  setup(props) {
    return () => (
      <section class="est" id="s-estimate">
        <header class="est__head">
          <h2 class="est__title">{props.estimate.title}</h2>
          <p class="est__text">{props.estimate.text}</p>
        </header>
        <ul class="est__cards">
          {props.estimate.items.map(item => (
            <li class={['est__card', item.to == null && 'est__card--from']} key={item.id}>
              <span class="est__icon" aria-hidden="true">
                <CuboIcon icon={iconOf(item)} size={22} />
              </span>
              <div class="est__copy">
                <span class="est__name">{item.title}</span>
                <strong class="est__price">{priceLabel(item.from, item.to)}</strong>
              </div>
            </li>
          ))}
        </ul>
        {props.estimate.total && (
          <p class="est__total">
            Итого по блокам: <strong>{priceLabel(props.estimate.total.from, props.estimate.total.to)}</strong>
            {props.estimate.rate != null && <span class="est__rate"> · ставка {money(props.estimate.rate)}/час</span>}
          </p>
        )}
      </section>
    )
  },
})
