import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { container } from '../presentation/container'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { heading } from '../../lib/style-presets'
import { logo } from '../presentation/logo'

const toArticle = (): void => {
	document
		.querySelector('x-app')
		?.shadowRoot?.querySelector('ullr-sbsc > ullr-shdw:nth-child(2)')
		?.scrollIntoView()
}

const toTryOut = (): void => {
	document
		.querySelector('x-app')
		?.shadowRoot?.querySelector('ullr-sbsc > ullr-shdw:nth-child(2)')
		?.shadowRoot?.querySelector('#article > ullr-shdw:nth-child(4)')
		?.shadowRoot?.querySelector('section')
		?.scrollIntoView()
}

export const hero = (): DirectiveFunction =>
	component(html`
		${style`
			header {
				height: 100vh;
			}
		`}
		<header>
			${container(
				() =>
					html`
						${style`
							:host {
								height: 100%;
							}
						`}
						${component(html`
							${style`
								${heading()}
								:host {
									display: grid;
									height: 100%;
									align-content: stretch;
								}
								h1 {
									font-size: 2em;
								}
								p {
									margin-top: 5rem;
								}
								a {
									display: inline-block;
									height: 2rem;
									& svg {
										height: 100%;
										width: auto;
									}
								}
								.content {
									display: grid;
								}
								.desc {
									max-width: 580px;
								}
								.link {
									display: grid;
									grid-auto-flow: column;
									justify-content: flex-start;
									grid-gap: 1rem;
								}
							`}
							<a href="/">${logo()}</a>
							<div class="content">
								<div class="desc">
									<h1>Dev Protocol</h1>
									<h2>A money designed for OSS</h2>
									<p>Earn staking rewards by supporting OSS</p>
								</div>
								<div class="link">
									${buttonRounded(() =>
										button({
											content: 'Read more',
											onClick: toArticle
										})
									)('primary')}
									${buttonRounded(() =>
										button({ content: 'Try out', onClick: toTryOut })
									)('primary')}
								</div>
							</div>
						`)}
					`
			)}
		</header>
	`)
