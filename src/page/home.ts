import { TemplateResult, html } from 'lit-html'
import { container } from '../component/presentation/container'
import { hero } from '../component/for-lp/hero'
import { section } from '../component/for-lp/section'
import { subscribe } from '@aggre/ullr/directive'
import { timer } from 'rxjs'
import { map, repeat } from 'rxjs/operators'
import { style } from '../lib/style'
import { asVar } from '../lib/style-properties'

const assets = ['oss', 'game', 'art', 'music', 'photo']
const assetsObs = timer(0, 1300).pipe(
	map(i => assets[i % assets.length]),
	repeat()
)

export const home = (): TemplateResult => html`
	${hero()}
	${container(
		() =>
			html`
				<article id="article">
					${section({
						title: 'Not payment, lockup',
						content: () => html`
							${style`
								span {
									color: ${asVar('primaryColor')};
								}
								p {
									max-width: 500px;
								}
							`}
							${subscribe(
								assetsObs,
								x =>
									html`
										<p>
											You can support an open-assets like an open-source by
											lockup, not payment. Asset authors can mine more DEV
											tokens with more lockup.
										</p>
										<p>
											DEV tokens is reward as a proof-of-<span>${x}</span> to
											the asset author.
										</p>
										<p>Supporters can increase more value with more lockup.</p>
									`
							)}
						`
					})}
					${section({
						title: 'Shareable',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								It's not losing your money, so you can freely change support
								destination of full amount.
							</p>
						`
					})}
					${section({
						title: 'Grow up your money',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								The more you lock up, the higher the DEV's scarcity value and
								the reduce total mining volume. You can earning interest,
								increase money while supporting open-assets.
							</p>
						`
					})}
					${section({
						title: 'Open governance',
						content: () => html`
							${style`
								p {
									max-width: 500px;
								}
							`}
							<p>
								Dev Protocol is neutral. Various rules that basis of the
								protocol can be changed by open governance.
							</p>
						`
					})}
				</article>
			`
	)}
`
