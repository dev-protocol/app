import { html, TemplateResult } from 'lit-html'

export interface Props {
	content?: TemplateResult | string
	onClick?: (e: Event) => void
}

export const button = ({ content = '', onClick }: Props): TemplateResult =>
	onClick === undefined
		? html`
				<button type="button">${content}</button>
		  `
		: html`
				<button type="button" @click=${onClick}>${content}</button>
		  `
