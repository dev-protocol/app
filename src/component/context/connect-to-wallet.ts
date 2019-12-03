import { TemplateResult } from 'lit-html'
import { button } from '../pure/button'
import { ContractFactory } from '@dev-protocol/dev-kit-js/esm/client'
import { devKitContract } from '../../store/dev-kit-contract'
import { provider } from 'web3-core'

interface Props {
	content?: string
	lib: ContractFactory
	ethereum: any
}

const handler = (
	lib: Props['lib'],
	ethereum: Window['ethereum']
) => async () => {
	const dev = lib((ethereum as unknown) as provider)
	await ethereum.enable().catch()
	devKitContract.next(dev)
}

export const connectToWallet = ({
	lib,
	ethereum,
	content = 'connect to wallet'
}: Props): TemplateResult =>
	button({ content, onClick: handler(lib, ethereum) })
