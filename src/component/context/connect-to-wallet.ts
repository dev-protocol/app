import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'
import { connect } from '../../lib/ethereum'

interface Props {
	content?: string
	ethereum: any
}

const handler = (ethereum: Window['ethereum']) => async (): Promise<void> =>
	connect(ethereum)

export const connectToWallet = ({
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult => button({ content, onClick: handler(ethereum) })
