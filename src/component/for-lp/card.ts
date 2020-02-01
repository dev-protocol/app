import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { DevProperty } from '../../store/properties'
import { asVar } from '../../lib/style-properties'
import { until } from 'lit-html/directives/until'
import { devKitContract } from '../../store/dev-kit-contract'
import { toNaturalNumber } from '../../lib/to-natural-number'
import BigNumber from 'bignumber.js'
import { promisify } from '../../lib/promisify'

const totalStaking = async (address: string): Promise<BigNumber> => {
	const dev = await promisify(devKitContract)
	return dev
		.lockup(process.env.ADDRESSES_LOCKUP)
		.getPropertyValue(address)
		.then(toNaturalNumber)
}

const myStaking = async (address: string): Promise<BigNumber> => {
	const dev = await promisify(devKitContract)
	return dev
		.lockup(process.env.ADDRESSES_LOCKUP)
		.getValue(address, window.ethereum.selectedAddress ?? '')
		.then(toNaturalNumber)
}

const button = html`
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width="100%"
		height="100%"
	>
		<circle fill="${asVar('secondaryColor')}" cx="12" cy="12" r="12" />
		<path stroke="white" stroke-linecap="round" d="M 9 6 L 15 12 L 9 18" />
	</svg>
`

export const card = ({
	address,
	name,
	authorName
}: DevProperty): DirectiveFunction =>
	component(html`
		${style`
			:host {
				font-family: ${asVar('fontFamilyUI')};
				display: grid;
				grid-template-columns: 1fr 0.4fr;
			}
			h1, h2, h3, p {
				margin: 0;
				font-weight: 500;
			}
			h1 {
				font-size: 1.1rem;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			p {
				font-size: 0.8rem;
			}
			.locked {
				display: grid;
				grid-template-areas:
					'total-title my-title'
					'total-value my-value'
			}
			dt {
				font-size: 0.9rem;
				color: ${asVar('onSurfaceWeakColor')};
				&.total {
					grid-area: total-title;
				}
				&.my {
					grid-area: my-title;
				}
			}
			dd {
				margin: 0;
				&.total {
					grid-area: total-value;
				}
				&.my {
					grid-area: my-value;
				}
			}
			.content {
				display: grid;
				grid-gap: 0.5rem;
			}
			.button {
				display: grid;
				justify-content: center;
				align-content: center;
				& svg {
					width: 30px;
				}
			}
		`}
		<div class="content">
			<h1>${name}</h1>
			<p>by <strong>${authorName}</strong></p>

			<dl class="locked">
				<dt class="total">Total</dt>
				<dd class="total">
					${until(
						totalStaking(address).then(
							x =>
								html`
									${x.dp(3)} DEV
								`
						),
						'...'
					)}
				</dd>
				<dt class="my">Your</dt>
				<dd class="my">
					${until(
						myStaking(address).then(
							x =>
								html`
									${x.dp(3)} DEV
								`
						),
						'...'
					)}
				</dd>
			</dl>
		</div>
		<div class="button">
			<div>
				${button}
				<p>Stake</p>
			</div>
		</div>
	`)
