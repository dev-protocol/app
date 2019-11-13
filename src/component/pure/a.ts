import { html, TemplateResult } from 'lit-html'

export interface Props {
	href: string
	content?: TemplateResult | string
	onClick?: (e: Event) => void
}

export const a = ({ href, content = '', onClick }: Props): TemplateResult =>
	onClick === undefined
		? html`
				<a href=${href}>${content}</a>
		  `
		: html`
				<a href=${href} @click=${onClick}>${content}</a>
		  `
