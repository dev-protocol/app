import { HttpProvider } from 'web3-core'
import Web3 from 'web3'

export interface Ethereum extends HttpProvider {
	enable: () => Promise<void>
	selectedAddress: string | null
	isConnected: () => boolean
}

declare global {
	interface Window {
		ethereum: Ethereum
		Web3: new (prop?: Ethereum) => Web3
	}
}
