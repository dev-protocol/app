import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { section as raw } from '../pure/section'
import { ViewTemplate } from '../../d/app'
import { heading } from '../../lib/style-presets'

export interface Props {
	title: string
	content: ViewTemplate
}

export const section = ({ title, content }: Props): DirectiveFunction =>
	component(html`
		${style`
			${heading()}
			section {
				padding-top: 2rem;
				padding-bottom: 10rem;
			}
		`}
		${raw(
			() => html`
				<h2>${title}</h2>
				<div class="content">${content()}</div>
			`
		)}
	`)
