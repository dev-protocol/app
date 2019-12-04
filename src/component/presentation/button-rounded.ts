import { component, DirectiveFunction } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { ViewTemplate } from '../../d/app'
import { style } from '../../lib/style'
import {
	buttonWithPadding,
	button,
	buttonWithNoBorder
} from '../../lib/style-presets'
import { asVar } from '../../lib/style-properties'

type Scheme = 'primary' | 'secondary'

export const buttonRounded = (
	template: ViewTemplate
): ((scehme: Scheme) => DirectiveFunction) => (
	scehme: Scheme
): DirectiveFunction =>
	component(html`
		${style`
			${button}
			${buttonWithNoBorder}
			${buttonWithPadding({ size: 'medium' })}
			button {
				border-radius: 3px;
				border: 0;
				background: ${asVar(scehme === 'primary' ? 'primaryColor' : 'secondaryColor')};
				color: ${asVar(scehme === 'primary' ? 'onPrimaryColor' : 'onSecondaryColor')};
			}
		`}
		${template()}
	`)
