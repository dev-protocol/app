import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'
import Web3 from 'web3'
import { HttpProvider } from 'web3-core'
import { web3 } from '../../store/web3'

type Constructable<T, TP> = new (prop: TP) => T
interface Props {
	content?: string
	web3: Constructable<Web3, HttpProvider>
	ethereum: any
}

const handler = (
	Web3js: Props['web3'],
	ethereum: Window['ethereum']
) => async () => {
	const web3Instance = new Web3js(ethereum)
	await ethereum.enable().catch()
	web3.next(web3Instance)
}

export const connectToWallet = ({
	web3: Web3js,
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult =>
	button({ content, onClick: handler(Web3js, ethereum) })
