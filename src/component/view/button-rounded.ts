import { component } from '@aggre/ullr/directive'
import { TemplateResult, html } from 'lit-html'
import { ViewTemplate } from '../../d/app'
import { style } from '../../lib/style'
import {
	buttonWithPadding,
	button,
	buttonWithNoBorder
} from '../../lib/style-presets'

export const buttonRounded = (template: ViewTemplate): TemplateResult => html`
	${component(html`
		${style`
			${button}
			${buttonWithNoBorder}
			${buttonWithPadding({ size: 'medium' })}
			button {
				border-radius: 999px;
				border: 0;
			}
		`}
		${template()}
	`)}
`
