import { DirectiveFunction } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { logo } from '../presentation/logo'
import { nav } from '../pure/nav'
import { asVar } from '../../lib/style-properties'
import { container } from '../presentation/container'
import { exLarge } from '../../lib/style-presets'

export const footer = (): DirectiveFunction =>
	container(
		() => html`
		${style`
			footer {
				display: grid;
				grid-gap: 4rem;
				margin: 4rem 0;
				font-size: 1rem;
			}
			a {
				display: inline-block;
				height: 2rem;
				text-decoration: none;
				color: ${asVar('fontColor')};
				& svg {
					height: 100%;
					width: auto;
				}
			}
			h1, p {
				margin: 0;
				font-weight: 500;
				font-size: 1rem;
			}
			nav {
				& ul {
					margin: 0;
					padding: 0;
					list-style: none;
					display: grid;
					justify-content: start;
					grid-gap: 1rem;
					${exLarge(`
						grid-auto-flow: column;
					`)}
				}
			}
			.protocol {
				display: grid;
				grid-auto-flow: column;
				justify-content: start;
				align-items: center;
				grid-gap: 2rem;
			}
		`}
		<footer>
			${nav(
				() => html`
					<ul>
						<li>
							<a
								href="https://github.com/dev-protocol"
								target="_blank"
								rel="noopener"
								>GitHub</a
							>
						</li>
						<li>
							<a
								href="https://discord.gg/VwJp4KM"
								target="_blank"
								rel="noopener"
								>Discord</a
							>
						</li>
						<li>
							<a
								href="https://spectrum.chat/devtoken"
								target="_blank"
								rel="noopener"
								>Spectrum</a
							>
						</li>
						<li>
							<a
								href="https://medium.com/devtoken"
								target="_blank"
								rel="noopener"
								>Medium</a
							>
						</li>
						<li>
							<a
								href="https://twitter.com/devtoken_rocks"
								target="_blank"
								rel="noopener"
								>Twitter</a
							>
						</li>
						<li>
							<a href="https://corp.frame00.com/" target="_blank" rel="noopener"
								>FRAME00, INC.</a
							>
						</li>
					</ul>
				`
			)}
			</nav>
			<div class="protocol">
				<a href="/">${logo()}</a>
				<h1>Dev Protocol</h1>
			</div>
		</footer>
	`
	)
