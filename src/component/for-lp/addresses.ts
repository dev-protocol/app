import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html, TemplateResult } from 'lit-html'
import { style } from '../../lib/style'
import { addresses as _addresses, Addresses } from '../../lib/addresses'
import { currentNetwork } from '../../store/current-network'
import { a } from '../pure/a'
import { asVar } from '../../lib/style-properties'
import { exLarge } from '../../lib/style-presets'

const address = (network: string) => (
	contractName: string,
	contractAddress: string
): TemplateResult =>
	html`
		<div>
			<span>${contractName}</span>${a({
				href: `//${
					network === 'main' ? '' : `${network}.`
				}etherscan.io/address/${contractAddress}`,
				target: '_blank',
				content: `${contractAddress} ↗`
			})}
		</div>
	`

const adf = (
	x: (contractName: string, contractAddress: string) => TemplateResult,
	adr: Addresses
): TemplateResult => html`
	${x('DEV(ERC-20)', adr.dev)} ${x('Lockup', adr.lokcup)}
	${x('Withdraw', adr.withdraw)} ${x('Allocator', adr.allocator)}
	${x('PropertyFactory', adr.propertyFactory)}
	${x('MarketFactory', adr.marketFactory)}
	${x('PolicyFactory', adr.policyFactory)}
	${x('Policy(Currently in force)', adr.policy)}
	${x('AddressConfig', adr.config)}
`

export const addresses = (): DirectiveFunction =>
	component(
		html`
			${style`
				ullr-sbsc {
					display: grid;
					grid-gap: 1rem;
				}
				div {
					display: grid;
					justify-content: start;
					color: ${asVar('onSurfaceVariantColor')};
					${exLarge(`
						grid-auto-flow: column;
						grid-template-columns: 300px auto;
					`)}
				}
				a {
					display: inline-block;
					font-family: monospace;
					font-size: 0.9em;
					color: ${asVar('onSurfaceVariantColor')};
					background: ${asVar('surfaceVariantColor')};
					word-break: break-all;
					padding: 0.2rem 0.5rem;
					border-radius: 3px;
					text-decoration: none;
				}
			`}
			${subscribe(currentNetwork, net =>
				net === 'main' ? adf(address(net), _addresses(net)!) : html``
			)}
		`
	)
