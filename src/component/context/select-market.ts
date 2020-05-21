import { html } from 'lit-html'
import { selectBox, SelectBoxItem } from '../presentation/select-box'
import { BehaviorSubject } from 'rxjs'
import { markets, DevMarket } from '../../store/markets'
import { DirectiveFunction } from 'ullr/directive'

const subject = new BehaviorSubject(
	markets.value.map((x) => ({
		selected: true,
		template: html` ${x.name} `,
		data: x,
	}))
)

const handler = (select: SelectBoxItem<DevMarket>) => () => {
	subject.next(
		subject.value.map(({ selected, template, data }) => ({
			selected: selected ? false : data.address === select.data.address,
			template,
			data,
		}))
	)
}

export const selectMarket = (): DirectiveFunction =>
	selectBox({ subject, handler })
