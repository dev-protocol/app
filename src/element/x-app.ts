import { customElements } from 'ullr'
import { html } from 'lit-html'
import { subscribe } from 'ullr/directive'
import { route } from '../store/route'
import { notFound } from '../page/notFound'
import { home } from '../page/home'

export const xApp = customElements(
	() => html` ${subscribe(route, (x) => (x === '/' ? home() : notFound()))} `
)
