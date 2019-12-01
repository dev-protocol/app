import { EthereumProvider } from 'web3x/providers/ethereum-provider'

export interface Ethereum extends EthereumProvider {
	enable: () => Promise<void>
	selectedAddress: string | null
	isConnected: () => boolean
}

declare global {
	interface Window {
		ethereum: Ethereum
	}
}
