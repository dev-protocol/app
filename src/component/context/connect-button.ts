import { buttonRounded } from '../view/button-rounded'
import { html, TemplateResult } from 'lit-html'
import { subscribe } from '@aggre/ullr/directive'
import { hasEthereum } from '../../store/has-ethereum'
import { button } from '../pure/button'
import { connectToWallet } from '../reactive/connect-to-wallet'
import { merge } from 'rxjs'
import { web3 } from '../../store/web3'
const { Web3 } = window

interface Props {
	ethereum: Window['ethereum']
}

export const template = ({ ethereum }: Props): TemplateResult => html`
	${subscribe(merge(hasEthereum, web3), () =>
		hasEthereum.value
			? ethereum.isConnected()
				? button({
						content: 'connected',
						onClick: () => true
				  })
				: connectToWallet({ web3: Web3, ethereum })
			: button({
					content: 'not found',
					disabled: true,
					onClick: () => true
			  })
	)}
`

export const connectButton = ({ ethereum }: Props): TemplateResult =>
	buttonRounded(() => template({ ethereum }))
