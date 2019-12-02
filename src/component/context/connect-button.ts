import { buttonRounded } from '../presentational/button-rounded'
import { html, TemplateResult } from 'lit-html'
import { subscribe } from '@aggre/ullr/directive'
import { hasEthereum } from '../../store/has-ethereum'
import { button } from '../pure/button'
import { connectToWallet } from '../reactive/connect-to-wallet'
import { merge } from 'rxjs'
import { web3, EthereumClass } from '../../store/web3'

interface Props {
	lib: EthereumClass
	ethereum: Window['ethereum']
}

export const template = ({ ethereum, lib }: Props): TemplateResult => html`
	${subscribe(merge(hasEthereum, web3), () =>
		hasEthereum.value
			? ethereum.isConnected()
				? button({
						content: 'connected',
						onClick: () => true
				  })
				: connectToWallet({ lib, ethereum })
			: button({
					content: 'not found',
					disabled: true,
					onClick: () => true
			  })
	)}
`

export const connectButton = (props: Props): TemplateResult =>
	buttonRounded(() => template(props))
