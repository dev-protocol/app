import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'
import { walletConnected } from '../../store/wallet-connected'

interface Props {
	content?: string
	ethereum: any
}

const handler = (ethereum: Window['ethereum']) => () => {
	ethereum
		.enable()
		.then(() => {
			walletConnected.next(true)
		})
		.catch()
}

export const connectToWallet = ({
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult => button({ content, onClick: handler(ethereum) })
