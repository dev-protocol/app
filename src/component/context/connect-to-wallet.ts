import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'
import { EthereumClass } from '../../store/web3'
import { web3Instantiated } from '../../store/web3-instantiated'

interface Props {
	content?: string
	lib: EthereumClass
	ethereum: any
}

const handler = (
	Lib: Props['lib'],
	ethereum: Window['ethereum']
) => async () => {
	const web3 = new Lib(ethereum)
	await ethereum.enable().catch()
	web3Instantiated.next(web3)
}

export const connectToWallet = ({
	lib,
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult =>
	button({ content, onClick: handler(lib, ethereum) })
