import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { addresses as _addresses } from '../../lib/addresses'
import { currentNetwork } from '../../store/current-network'

const address = (
	contractName: string,
	contractAddress: string
): DirectiveFunction =>
	component(html`
		${style`
		`}
		<div><span>${contractName}</span><span>${contractAddress}</span></div>
	`)

export const addresses = (): DirectiveFunction =>
	component(
		html`
			${subscribe(currentNetwork, net =>
				net === 'main'
					? html`
							${address('DEV', _addresses(net)!.dev)}
							${address('Lockup', _addresses(net)!.lokcup)}
							${address('Withdraw', _addresses(net)!.withdraw)}
							${address('Allocator', _addresses(net)!.allocator)}
							${address('PropertyFactory', _addresses(net)!.propertyFactory)}
					  `
					: html``
			)}
		`
	)
