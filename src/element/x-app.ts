import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { subscribe } from '@aggre/ullr/directive'
import { route } from '../store/route'
import { notFound } from '../page/notFound'
import { home } from '../page/home'

export const xApp = customElements(
	() => html`
		${subscribe(route, x => (x === '/' ? home() : notFound()))}
	`
)
