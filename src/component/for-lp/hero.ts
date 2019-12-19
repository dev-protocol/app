import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { container } from '../presentation/container'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { heading } from '../../lib/style-presets'
import { logo } from '../presentation/logo'

export const hero = (): DirectiveFunction =>
	component(html`
		${style`
			header {
				height: 90vh;
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
									font-size: 2rem;
								}
								p {
									font-size: 1.6rem;
								}
								a {
									display: inline-block;
									height: 2rem;
								}
								a svg {
									height: 100%;
									width: auto;
								}
								.content {
									display: grid;
								}
								.desc {
									max-width: 580px;
								}
								.desc h1,
								.desc p {
									display: inline;
								}
								.hide {
									display: none;
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
									<p>
										<span class="hide">Dev Protocol</span> monetizes any
										open-assets. The new money for the openable and shareable
										era.
									</p>
								</div>
								<div class="link">
									${buttonRounded(() => button({ content: 'Read more' }))(
										'primary'
									)}
									${buttonRounded(() => button({ content: 'Try out' }))(
										'primary'
									)}
								</div>
							</div>
						`)}
					`
			)}
		</header>
	`)
