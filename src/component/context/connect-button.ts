import { buttonRounded } from '../presentation/button-rounded'
import { html, TemplateResult } from 'lit-html'
import { subscribe } from '@aggre/ullr/directive'
import { hasEthereum } from '../../store/has-ethereum'
import { button } from '../pure/button'
import { connectToWallet } from './connect-to-wallet'
import { merge } from 'rxjs'
import { devKit } from '../../store/dev-kit'

interface Props {
	ethereum: Window['ethereum']
}

export const template = ({ ethereum }: Props): TemplateResult => html`
	${subscribe(merge(hasEthereum, devKit), () =>
		hasEthereum.value && devKit.value
			? ethereum.isConnected()
				? button({
						content: 'connected',
						onClick: () => true
				  })
				: connectToWallet({ lib: devKit.value, ethereum })
			: button({
					content: 'not found',
					disabled: true,
					onClick: () => true
			  })
	)}
`

export const connectButton = (props: Props): TemplateResult =>
	buttonRounded(() => template(props))('primary')
