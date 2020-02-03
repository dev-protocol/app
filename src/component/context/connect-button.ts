import { buttonRounded } from '../presentation/button-rounded'
import { html, TemplateResult } from 'lit-html'
import { subscribe, DirectiveFunction } from '@aggre/ullr/directive'
import { hasEthereum } from '../../store/has-ethereum'
import { button } from '../pure/button'
import { connectToWallet } from './connect-to-wallet'
import { merge } from 'rxjs'
import { walletConnected } from '../../store/wallet-connected'

interface Props {
	ethereum: Window['ethereum']
}

const template = ({ ethereum }: Props): TemplateResult => html`
	${subscribe(merge(hasEthereum, walletConnected), () =>
		hasEthereum.value
			? walletConnected.value
				? button({
						content: 'connected',
						onClick: () => true
				  })
				: connectToWallet({ ethereum })
			: button({
					content: 'not found',
					disabled: true,
					onClick: () => true
			  })
	)}
`

export const connectButton = (props: Props): DirectiveFunction =>
	buttonRounded(() => template(props))('primary')
