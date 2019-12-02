import { TemplateResult, html } from 'lit-html'
import { globalHeader } from '../component/context/global-header'
import { component } from '@aggre/ullr/directive'
import { style } from '../lib/style'
import { link } from '../component/reactive/link'
import { a } from '../lib/style-presets'
import { animatedArrow } from '../component/presentational/animated-arrow'
const { ethereum } = window

export const notFound = (): TemplateResult => html`
	${globalHeader({ ethereum })}
	${component(html`
		${style`
			main {
				display: grid;
				justify-content: center;
				align-content: center;
				height: calc(100vh - 8rem);
			}
			h1 {
				margin: 0;
				font-weight: normal;
			}
			${a}
		`}
		<main>
			<h1>Not founded</h1>
			<p>
				${link({
					href: '/',
					content: html`
						Back ${animatedArrow()}
					`
				})}
			</p>
		</main>
	`)}
`
