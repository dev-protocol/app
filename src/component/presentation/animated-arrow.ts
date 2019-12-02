import { component } from '@aggre/ullr/directive'
import { TemplateResult, html } from 'lit-html'
import { style } from '../../lib/style'

export const animatedArrow = (): TemplateResult => html`
	${component(html`
		${style`
			span {
				display: inline-block;
				animation: 1s steps(4) infinite tick;
			}
			@keyframes tick {
				to   {
					transform: translateX(10px);
				}
			}
		`}
		<span>➜</span>
	`)}
`
