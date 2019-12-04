import { html } from 'lit-html'
import { selectBox, SelectBoxItem } from '../presentation/select-box'
import { BehaviorSubject } from 'rxjs'
import { markets, DevMarket } from '../../store/markets'
import { DirectiveFunction } from '@aggre/ullr/directive'

const items = new BehaviorSubject(
	markets.value.map(x => ({
		selected: true,
		template: html`
			${x.name}
		`,
		data: x
	}))
)

const handler = (select: SelectBoxItem<DevMarket>) => () => {
	items.next(
		items.value.map(({ selected, template, data }) => ({
			selected:
				selected === true ? false : data.address === select.data.address,
			template,
			data
		}))
	)
}

export const selectMarket = (): DirectiveFunction => selectBox(items, handler)
