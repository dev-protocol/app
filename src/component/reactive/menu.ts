import { TemplateResult, html } from 'lit-html'
import { nav } from '../../store/nav'
import { nav as navEL } from '../pure/nav'
import { subscribe } from '@aggre/ullr/directive'
import { link } from './link'

interface Props {
	activeClass?: string
}

export const menu = ({ activeClass = 'active' }: Props = {}): TemplateResult =>
	html`
		${subscribe(nav, x =>
			navEL({
				items: x.map(({ href, label, active }) =>
					link({ href, content: label, class: active ? activeClass : '' })
				)
			})
		)}
	`
