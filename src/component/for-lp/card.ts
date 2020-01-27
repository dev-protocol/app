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
		.lockup()
		.getValue(address, address)
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
		<circle fill="#0047ff" cx="12" cy="12" r="12" />
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
				margin-top: 1rem;
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
			<p class="locked">
				${until(
					totalStaking(address).then(
						x =>
							html`
								${x.dp(3)} DEV
							`
					),
					'0 DEV'
				)}
			</p>
		</div>
		<div class="button">
			<div>
				${button}
				<p>Stake</p>
			</div>
		</div>
	`)
