import { html, TemplateResult } from 'lit-html'

export interface Props {
	content?: TemplateResult | string
	onClick?: (e: Event) => void
	disabled?: boolean
}

export const button = ({
	content = '',
	disabled = false,
	onClick,
}: Props): TemplateResult =>
	onClick === undefined
		? html` <button type="button" ?disabled=${disabled}>${content}</button> `
		: html`
				<button type="button" ?disabled=${disabled} @click=${onClick}>
					${content}
				</button>
		  `
