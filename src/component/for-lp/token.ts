import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { asVar } from '../../lib/style-properties'
import { exLarge } from '../../lib/style-presets'
import { web3Dev } from '../../store/web3-dev'
import { promisify } from '../../lib/promisify'
import { toNaturalNumber } from '../../lib/to-natural-number'
import BigNumber from 'bignumber.js'
import { until } from 'lit-html/directives/until'

const getSupply = async (): Promise<Array<BigNumber | undefined>> => {
	const [dev] = await Promise.all([promisify(web3Dev)])
	const totalSupply: BigNumber = await dev.methods
		.totalSupply()
		.call()
		.then(toNaturalNumber)
	const team: BigNumber = await dev.methods
		.balanceOf('0xe23fe51187a807d56189212591f5525127003bdf')
		.call()
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
			${until(
				getSupply().then(
					([total, circulation]) =>
						html`
							<div><span>Total Supply</span>${total?.dp(3).toFixed()}</div>
							<div>
								<span>Circulation Supply</span>${circulation?.dp(3).toFixed()}
								(${circulation
									?.div(total ?? 1)
									.times(100)
									.dp(1)}%)
							</div>
						`
				),
				''
			)}
		`
	)
