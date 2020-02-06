import { html, TemplateResult } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'

export interface Props {
	href: string
	content?: TemplateResult | string
	class?: string
	target?: '_self' | '_blank' | '_parent' | '_top'
	onClick?: (e: Event) => void
}

export const a = ({
	href,
	content = '',
	class: cls = '',
	target,
	onClick
}: Props): TemplateResult =>
	onClick === undefined
		? html`
				<a
					href=${href}
					class=${cls}
					target=${ifDefined(target)}
					rel=${ifDefined(target === '_blank' ? 'noopener' : undefined)}
					>${content}</a
				>
		  `
		: html`
				<a
					href=${href}
					class=${cls}
					target=${ifDefined(target)}
					rel=${ifDefined(target === '_blank' ? 'noopener' : undefined)}
					@click=${onClick}
					>${content}</a
				>
		  `
