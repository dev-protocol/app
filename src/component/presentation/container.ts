import { component, DirectiveFunction } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { ViewTemplate } from '../../d/app'
import { container as containerStyle } from '../../lib/style-presets'

export const container = (template: ViewTemplate): DirectiveFunction =>
	component(html`
		${style`
			${containerStyle('div')}
		`}
		<div>
			${template()}
		</div>
	`)
