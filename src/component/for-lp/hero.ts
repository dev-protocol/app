import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { container } from '../presentation/container'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { heading } from '../../lib/style-presets'
import { logo } from '../presentation/logo'
import { querySelectorDeep } from 'query-selector-shadow-dom'
import { globalNav } from '../presentation/global-nav'
import { a } from '../pure/a'
import { asVar } from '../../lib/style-properties'

const toArticle = (): void => {
	querySelectorDeep('article')?.scrollIntoView()
}

const toTryOut = (): void => {
	querySelectorDeep('#tryout')?.scrollIntoView()
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
							${globalNav(
								() =>
									component(html`
										${style`
											a {
												display: inline-block;
												height: 2rem;
												& svg {
													height: 100%;
													width: auto;
												}
											}
										`}
										${a({ href: '/', content: logo() })}
									`),
								() =>
									component(html`
										${style`
											a {
												color: ${asVar('fontColor')};
											}
										`}
										${a({
											href: '//bit.ly/dev-protocol-deck-sum',
											target: '_blank',
											content: 'About',
										})}
									`)
							)}
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
											onClick: toArticle,
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
