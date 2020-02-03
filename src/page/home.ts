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
import { figureNetwork } from '../component/for-lp/figure-network'

const toUpgrade = (e: Event): void => {
	e.preventDefault()
	document
		.querySelector('body > x-app')
		?.shadowRoot?.querySelector('ullr-sbsc > ullr-shdw:nth-child(2)')
		?.shadowRoot?.querySelector('#article > ullr-shdw:nth-child(8)')
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
								.content {
									display: grid;
									grid-gap: 2rem;
									${exLarge(`
										grid-auto-flow: column;
										grid-template-columns: auto 1fr;
									`)}
								}
								figure {
									margin: 0;
									${exLarge(`
										margin: 0 8%;
									`)}
								}
							`}
							<p>
								After the traditional material economy, Dev is a new crypto
								economy based on "open assets" that enhances individual
								activities and revitalizes the economy.
							</p>
							<figure>${figureNetwork()}</figure>
						`
					})}
					${section({
						title: 'Support starts as staking, not as payment',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								Staking is a new way of spending money. Staked DEV returns to
								you after a lockup period. The more stake, the more rewards you
								receive. That's why we believe that staking is an effective way
								to sustain monetary support for open assets.
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
									Dev's characteristic is that as the "Proof of OSS Power," it uses the results of creators' activities as the mining power. Open assets are now economically valued and rewarded for activity.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/POLICY.md#rewards target="_blank" ref="noopener">More detail for mining</a></p>
								</div>
								<div>
									<h3>Staking</h3>
									<p>
									By staking as supporters, you can earn staking rewards, and the mining power of developers can be enhanced. Locking Dev to an asset allows you to conduct economic transactions.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/WHITEPAPER.md#staking target="_blank" ref="noopener">More detail for staking</a></p>
								</div>
								<div>
									<h3>Governance</h3>
									<p>
									The Dev ecosystem is autonomously enhanced by users, such as opening new asset markets and proposing policies.
									</p>
									<p><a href=https://github.com/dev-protocol/protocol/blob/master/docs/WHITEPAPER.md#governance target="_blank" ref="noopener">More detail for governance</a></p>
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
											>Are you have old DEV tokens? Upgrade now!</a
										>
									</p>
									<ul>
										<li>
											<h3>Choose OSS</h3>
										</li>
										<li>
											<h3>Stake your 1 DEV</h3>
											<p>
												You automatically get 1 DEV when the first staking,
												don't worry.
											</p>
										</li>
										<li>
											<h3>Open the message</h3>
											<p>
												You can withdraw 1 DEV by running the release of
												staking.
											</p>
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
						title: 'Sponser',
						content: () =>
							html`
								${style`
									span {
										border-bottom: 1px solid;
									}
									a {
										color: ${asVar('fontColor')};
									}
								`}
								<p>
									Become a sponsor if you stake for more than
									<span>100 DEV</span>.
								</p>
								<p>
									Please contact us for details.
									<a href="mainto:hi@devprtcl.com">hi@devprtcl.com</a>
								</p>
							`
					})}
					${section({
						title: 'Community',
						content: () =>
							html`
								${style`
									span {
										border-bottom: 1px solid;
									}
									a {
										color: ${asVar('fontColor')};
									}
								`}
								<p>
									To learn more about Dev, join the community. Receive
									notifications of the latest updates.
								</p>
								<p>
									<a
										href="https://twitter.com/devprtcl"
										target="_blank"
										rel="noopener"
										>Twitter</a
									>
									/
									<a
										href="https://discord.gg/VwJp4KM"
										target="_blank"
										rel="noopener"
										>Discord</a
									>
									/
									<a
										href="https://spectrum.chat/devtoken"
										target="_blank"
										rel="noopener"
										>Spectrum</a
									>
									/
									<a
										href="https://medium.com/devtoken"
										target="_blank"
										rel="noopener"
										>Blog</a
									>
								</p>
							`
					})}
					${section({
						title: 'Upgrade DEV',
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
