import { TemplateResult, html } from 'lit-html'
import { container } from '../component/presentation/container'
import { hero } from '../component/for-lp/hero'
import { section } from '../component/for-lp/section'
import { style } from '../lib/style'
import { asVar } from '../lib/style-properties'
import { exLarge, heading, onlyMinWidth } from '../lib/style-presets'
import { milestones } from '../component/for-lp/milestones'
import { footer } from '../component/for-lp/footer'
import { updagradeDev } from '../component/for-lp/upgrade-dev'
import { component } from 'ullr/directive'
import { figureNetwork } from '../component/for-lp/figure-network'
import { querySelectorDeep } from 'query-selector-shadow-dom'
import { partners, team } from '../component/for-lp/team'
import { addresses } from '../component/for-lp/addresses'
import { token } from '../component/for-lp/token'
import { a } from '../component/pure/a'

export const home = (): TemplateResult => html`
	${hero()}
	${container(
		() => html`
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
										grid-template-columns: 1fr 1fr;
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
							economy based on "open assets" that enhances individual activities
							and revitalizes the economy.
						</p>
						<figure>${figureNetwork()}</figure>
					`,
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
							Staking is a new way of spending money. Staked DEV returns to you
							after a lockup period. The more stake, the more rewards you
							receive. That's why we believe that staking is an effective way to
							sustain monetary support for open assets.
						</p>
					`,
				})}
				${section({
					content: () => html`
						${style`
								.content {
									display: grid;
									grid-gap: 4rem;
								}
								h2, h3, p {
									margin: 0;
								}
								h2 {
									text-align: center;
								}
								h3 {
									font-size: 1rem;
								}
								.col {
									display: grid;
									grid-gap: 2rem;
									text-align: center;
									${exLarge(`
										grid-auto-flow: column;
									`)}
									& div {
										display: grid;
										align-content: flex-start;
									}
									& p {
										font-size: 3rem;
										${onlyMinWidth(768)(`
											font-size: 3.3rem;
										`)}
										${onlyMinWidth(1024)(`
											font-size: 4.6rem;
										`)}
										${onlyMinWidth(1280)(`
											font-size: 5rem;
										`)}
									}
								}
								.desc {
									margin: auto 0;
									font-size: 0.9rem;
									max-width: 500px;
									justify-self: center;
								}
							`}
						<h2>Dev Protocol by the numbers</h2>
						<div class="col">
							<div>
								<p>1,500+</p>
								<h3>of OSS projects</h3>
							</div>
							<div>
								<p>8.4+ billion</p>
								<h3>of monthly downloads</h3>
							</div>
							<div>
								<p>$70K+</p>
								<h3>of rewards</h3>
							</div>
						</div>
						<p class="desc">
							We launched Dev Protocol's MVP in July 2018. These numbers show
							the results of the MVP before Dev Protocol went live on the
							mainnet in January 2020.</br>
							During the MVP phase, more than 1,500 OSS projects have makes
							8.4 billion downloads per month, OSS developers have mined
							1,583,327 DEV by the Dev Protocol. It means that the market
							cap of 71,571 USD distributed to OSS developers and keeps sustainability.
						</p>
					`,
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
						`,
				})}
				${section({
					title: 'Token Overview',
					content: () =>
						html` ${style`
								a {
									color: ${asVar('fontColor')};
								}
							`}
							${token()}
							<p>
								Token distribution is now planning. To be the first to know,
								join the
								${a({
									href: '#',
									content: 'community',
									onClick: (e) => {
										e.preventDefault()
										querySelectorDeep('#community')?.scrollIntoView()
									},
								})}.
							</p>`,
				})}
				${section({
					title: 'Contracts',
					content: () =>
						html`
							<p>
								Main contracts and their addresses are as follows:
							</p>
							${addresses()}
							<p>
								<small
									><i
										>* All contract addresses that configures Dev Protocol is
										listed by "AddressConfig."</i
									></small
								>
							</p>
						`,
				})}
				${section({
					title: 'Milestones',
					content: () => html` ${milestones()} `,
				})}
			</article>
		`
	)}
	${component(html`
		${style`
			:host {
				display: block;
				padding: 3rem 0;
				background: white;
				color: black;
				text-align: center;
				display: grid;
				grid-gap: 3rem;
			}
			h2 {
				margin: 0;
			}
			${heading()}
		`}
		<h2>Team</h2>
		${team()}
		<h2>We're backed by</h2>
		${partners()}
	`)}
	${container(
		() =>
			html`
				${section({
					id: 'community',
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
									href="https://discord.gg/VwJp4KM"
									target="_blank"
									rel="noopener"
									>Discord</a
								>
								/
								<a href="https://t.me/devprtcl" target="_blank" rel="noopener"
									>Telegram</a
								>
								/
								<a
									href="https://medium.com/devtoken"
									target="_blank"
									rel="noopener"
									>Medium</a
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
									href="https://twitter.com/devprtcl"
									target="_blank"
									rel="noopener"
									>Twitter</a
								>
							</p>
						`,
				})}
				${section({
					id: 'upgrade',
					title: 'Upgrade DEV',
					content: () => html` ${updagradeDev()} `,
				})}
			`
	)}
	${footer()}
`
