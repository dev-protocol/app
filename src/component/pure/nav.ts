import { html, TemplateResult } from 'lit-html'
import { ViewTemplate } from '../../d/app'

export const nav = (template: ViewTemplate): TemplateResult =>
	html`
		<nav>${template()}</nav>
	`
