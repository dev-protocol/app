import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { subscribe } from '@aggre/ullr/directive'
import { route } from '../store/route'
import { list } from '../page/list'
import { notFound } from '../page/notFound'

export const xApp = customElements(
	() => html`
		${subscribe(route, x => (x === '/' ? list() : notFound()))}
	`
)
