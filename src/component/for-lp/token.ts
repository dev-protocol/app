import { DirectiveFunction, component, subscribe } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { asVar } from '../../lib/style-properties'
import { exLarge } from '../../lib/style-presets'
import { devKitContract } from '../../store/dev-kit-contract'
import { promisify } from '../../lib/promisify'
import { toNaturalNumber } from '../../lib/to-natural-number'
import BigNumber from 'bignumber.js'
import { until } from 'lit-html/directives/until'
import { addresses } from '@devprtcl/dev-kit-js'
import { currentNetwork } from '../../store/current-network'

const getSupply = async (): Promise<Array<BigNumber | undefined>> => {
	const [dev] = await Promise.all([promisify(devKitContract)])
	const address = await dev.registry(addresses.eth.main.registry).token()
	const devToken = dev.dev(address)
	const totalSupply: BigNumber = await devToken
		.totalSupply()
		.then(toNaturalNumber)
	const team: BigNumber = await devToken
		.balanceOf('0xe23fe51187a807d56189212591f5525127003bdf')
		.then(toNaturalNumber)
	return [totalSupply, totalSupply.minus(team)]
}

export const token = (): DirectiveFunction =>
	component(
		html`
			${style`
				div {
					display: grid;
					justify-content: start;
					color: ${asVar('fontColor')};
					${exLarge(`
						grid-auto-flow: column;
						grid-template-columns: 300px auto;
					`)}
					& span {
						color: ${asVar('onSurfaceVariantColor')};
					}
				}
			`}
			${subscribe(currentNetwork, (net) =>
				net === 'main'
					? html`${until(
							getSupply().then(
								([total, circulation]) =>
									html`
										<div>
											<span>Total Supply</span>${total?.dp(3).toFixed()}
										</div>
										<div>
											<span>Circulation Supply</span>${circulation
												?.dp(3)
												.toFixed()}
											(${circulation
												?.div(total ?? 1)
												.times(100)
												.dp(1)}%)
										</div>
									`
							),
							''
					  )}`
					: html`(We're don't support other than mainnet yet.)`
			)}
		`
	)
