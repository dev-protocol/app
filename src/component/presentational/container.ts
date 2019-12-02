import { component } from '@aggre/ullr/directive'
import { TemplateResult, html } from 'lit-html'
import { style } from '../../lib/style'
import { ViewTemplate } from '../../d/app'
import { container as containerStyle } from '../../lib/style-presets'

export const container = (template: ViewTemplate): TemplateResult => html`
	${component(html`
		${style`
			${containerStyle('div')}
		`}
		<div>
			${template()}
		</div>
	`)}
`
