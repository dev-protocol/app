import { component, DirectiveFunction } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { nav } from '../pure/nav'
import { ViewTemplate } from '../../d/app'

export const globalNav = (
	leftSide?: ViewTemplate,
	rightSide?: ViewTemplate
): DirectiveFunction =>
	component(html`
		${style`
			nav {
				display: grid;
				grid-auto-flow: column;
				grid-template-columns: 0.5fr 0.5fr;
			}
			.left {
				place-self: start;
				align-self: center;
			}
			.right {
				place-self: self-end;
				align-self: center;
			}
		`} ${nav(
			() => html`
				<div class="left">${leftSide?.()}</div>
				<div class="right">${rightSide?.()}</div>
			`
		)}
	`)
