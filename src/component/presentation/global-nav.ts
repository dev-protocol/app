import { component, DirectiveFunction } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { nav } from '../pure/nav'
import { ViewTemplate } from '../../d/app'

export const globalNav = (
	leftSide: ViewTemplate,
	rightSide: ViewTemplate
): DirectiveFunction =>
	component(html`
		${style`
			nav {
				display: grid;
				grid-auto-flow: column;
				grid-template-columns: 0.5fr 1fr 0.5fr;
			}
			.left {
				place-self: start;
			}
			.center {
				place-self: center;
			}
			.right {
				place-self: self-end;
			}
		`}
		${nav(
			() => html`
				<div class="left">
					${leftSide()}
				</div>
				<div class="center">App Name Here</div>
				<div class="right">
					${rightSide()}
				</div>
			`
		)}
	`)
