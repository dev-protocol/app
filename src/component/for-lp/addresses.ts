import { DirectiveFunction, component, subscribe } from 'ullr/directive'
import { html, TemplateResult, DirectiveFn } from 'lit-html'
import { style } from '../../lib/style'
import { currentNetwork } from '../../store/current-network'
import { a } from '../pure/a'
import { asVar } from '../../lib/style-properties'
import { exLarge } from '../../lib/style-presets'
import { zip } from 'rxjs'
import { devKitContract } from '../../store/dev-kit-contract'
import { addresses as _addresses } from '@devprotocol/dev-kit'
import { until } from 'lit-html/directives/until'
import { RegistryContract } from '@devprotocol/dev-kit/esm/registry'
import { Except } from 'type-fest'

const address = (network: string, registry: RegistryContract) => (
	label: string,
	contractName: keyof Except<RegistryContract, 'contract'>
): DirectiveFn =>
	until(
		registry[contractName]().then(
			(adr) => html`
				<div>
					<span>${label}</span>${a({
						href: `//${
							network === 'main' ? '' : `${network}.`
						}etherscan.io/address/${adr}`,
						target: '_blank',
						content: `${adr} ↗`,
					})}
				</div>
			`
		)
	)

const adf = (x: ReturnType<typeof address>): TemplateResult => html`
	${x('DEV(ERC-20)', 'token')} ${x('Lockup', 'lockup')}
	${x('Withdraw', 'withdraw')} ${x('Allocator', 'allocator')}
	${x('PropertyFactory', 'propertyFactory')}
	${x('MarketFactory', 'marketFactory')} ${x('PolicyFactory', 'policyFactory')}
	${x('Policy(Currently in force)', 'policy')}
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
			`} ${subscribe(zip(currentNetwork, devKitContract), ([net, devkit]) =>
				net === 'main' && devkit
					? adf(address(net, devkit.registry(_addresses.eth.main.registry)))
					: html``
			)}
		`
	)
