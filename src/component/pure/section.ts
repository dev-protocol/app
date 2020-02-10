import { html, TemplateResult } from 'lit-html'
import { ViewTemplate } from '../../d/app'
import { ifDefined } from 'lit-html/directives/if-defined'

export const section = (template: ViewTemplate, id?: string): TemplateResult =>
	html`
		<section id=${ifDefined(id)}>
			${template()}
		</section>
	`
