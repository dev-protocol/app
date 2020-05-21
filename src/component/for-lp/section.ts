import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { section as raw } from '../pure/section'
import { ViewTemplate } from '../../d/app'
import { heading, exLarge } from '../../lib/style-presets'

export interface Props {
	id?: string
	title?: string
	content: ViewTemplate
}

export const section = ({ id, title, content }: Props): DirectiveFunction =>
	component(html`
		${style`
			${heading()}
			section {
				padding-top: 2rem;
				padding-bottom: 6rem;
				${exLarge(`
					padding-bottom: 10rem;
				`)}
			}
		`}
		${raw(
			() => html`
				${title ? html` <h2>${title}</h2> ` : ''}
				<div class="content">${content()}</div>
			`,
			id
		)}
	`)
