import { html, TemplateResult } from 'lit-html'
import { ViewTemplate } from '../../d/app'

export const section = (template: ViewTemplate): TemplateResult =>
	html`
		<section>
			${template()}
		</section>
	`
