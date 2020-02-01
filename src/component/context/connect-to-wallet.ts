import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'

interface Props {
	content?: string
	ethereum: any
}

const handler = (ethereum: Window['ethereum']) => async () => {
	await ethereum.enable().catch()
}

export const connectToWallet = ({
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult => button({ content, onClick: handler(ethereum) })
