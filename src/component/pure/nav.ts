import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'

export interface Props {
	items: Array<TemplateResult>
}

export const nav = ({ items }: Props): TemplateResult => html`
	<nav>
		<ul>
			${repeat(
				items,
				x =>
					html`
						<li>${x}</li>
					`
			)}
		</ul>
	</nav>
`
