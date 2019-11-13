import { html, TemplateResult } from 'lit-html'
import { route } from '../store/route'

interface Props {
	readonly href: string
	readonly content?: TemplateResult | string
}

const handler = (url: string) => (e: Event) => {
	e.preventDefault()
	route.next(url)
}

export const a = ({ href, content = '' }: Props): TemplateResult =>
	href.startsWith('//')
		? html`
				<a href=${href}>${content}</a>
		  `
		: html`
				<a href=${href} @click=${handler(href)}>${content}</a>
		  `
