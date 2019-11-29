import { html, TemplateResult } from 'lit-html'

export interface Props {
	href: string
	content?: TemplateResult | string
	class?: string
	onClick?: (e: Event) => void
}

export const a = ({
	href,
	content = '',
	class: cls = '',
	onClick
}: Props): TemplateResult =>
	onClick === undefined
		? html`
				<a href=${href} class=${cls}>${content}</a>
		  `
		: html`
				<a href=${href} class=${cls} @click=${onClick}>${content}</a>
		  `
