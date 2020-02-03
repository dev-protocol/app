import { TemplateResult, html } from 'lit-html'
import { container } from '../component/presentation/container'
import { hero } from '../component/for-lp/hero'
import { section } from '../component/for-lp/section'
import { style } from '../lib/style'
import { asVar } from '../lib/style-properties'
import { exLarge, heading } from '../lib/style-presets'
import { milestones } from '../component/for-lp/milestones'
import { footer } from '../component/for-lp/footer'
import { updagradeDev } from '../component/for-lp/upgrade-dev'
import { component } from '@aggre/ullr/directive'

const toUpgrade = (e: Event): void => {
	e.preventDefault()
	document
		.querySelector('x-app')
		?.shadowRoot?.querySelector('ullr-shdw:nth-child(2)')
		?.shadowRoot?.querySelector('#article > ullr-shdw:nth-child(6)')
		?.shadowRoot?.querySelector('section')
		?.scrollIntoView()
}

export const home = (): TemplateResult => html`
	${hero()}
	${container(
		() =>
			html`
				<article id="article">
					${section({
						title: 'For OSS Sustainability',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								After the previous material economy, Dev is a new crypto-economy
								based on “open assets".
							</p>
						`
					})}
					${section({
						title: 'Staking and grow your money',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								Staking is a new way of spending money. Share money, reuse,
								never lose. When staking Dev to OSS, asset owners increase their
								mining power, and supporters raise the rarity of Dev.
							</p>
						`
					})}
					${section({
						title: 'How designed for OSS?',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
								.col {
									display: grid;
									grid-gap: 3rem;
									${exLarge(`
										grid-auto-flow: column;
									`)}
									& div {
										display: grid;
										align-content: flex-start;
									}
								}
								a {
									color: ${asVar('primaryColor')};
								}
							`}
							<div class="col">
								<div>
									<h3>Mining</h3>
									<p>
										Dev is mined with your OSS power. Open assets are now
										economically valued and rewarded for activity.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/POLICY.md#rewards target="_blank" ref="noopener">➝ More detail for mining</a></p>
								</div>
								<div>
									<h3>Staking</h3>
									<p>
										Staking rewards for both asset owners and payers. Locking
										Dev to an asset allows you to conduct economic transactions.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/WHITEPAPER.md#staking target="_blank" ref="noopener">➝ More detail for staking</a></p>
								</div>
								<div>
									<h3>Governance</h3>
									<p>
										The ecosystem is autonomously enhanced by users, such as
										opening new asset markets and proposing policies.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/WHITEPAPER.md#governance target="_blank" ref="noopener">➝ More detail for governance</a></p>
								</div>
							</div>
						`
					})}
					${section({
						content: () =>
							html`
								${component(html`
									${style`
								${heading()}
								h2, p {
									text-align: center;
								}
								p {
									margin: 0;
									color: ${asVar('weakColor')};
									& a {
										color: ${asVar('fontColor')};
										font-size: 0.8rem;
									}
								}
								ul {
									display: grid;
									justify-items: center;
									grid-gap: 1rem;
									margin: 3rem 0;
									padding: 0;
									list-style: none;
									counter-reset: section;
									@media only screen and (min-width: 720px) {
										grid-auto-flow: column;
									}
									& li {
										width:200px;
										text-align: center;
										font-size: 0.8rem;
										&::before {
											content: counter(section);
											counter-increment: section;
										}
									}
								}
							`}
									<h2>Try out</h2>
									<p>
										Let's stake to open the secret messages!
										<a href="#" @click=${toUpgrade}
											>Are you have old DEV tokens?</a
										>
									</p>
									<ul>
										<li>
											<h3>Choose OSS</h3>
										</li>
										<li>
											<h3>Stake your 1 DEV</h3>
											<p>You automatically get 1 DEV, don't worry.</p>
										</li>
										<li>
											<h3>Open the message</h3>
											<p>You can withdraw the DEV after one month.</p>
										</li>
									</ul>
									<x-try></x-try>
								`)}
							`
					})}
					${section({
						title: 'Milestones',
						content: () =>
							html`
								${milestones()}
							`
					})}
					${section({
						content: () =>
							html`
								${updagradeDev()}
							`
					})}
					${footer()}
				</article>
			`
	)}
`
