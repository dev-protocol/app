import { BehaviorSubject } from 'rxjs'
import { HttpProvider } from 'web3-core'

interface Ethereum extends HttpProvider {
	enable: () => Promise<void>
	selectedAddress: string | null
	isConnected: () => boolean
}

declare global {
	interface Window {
		ethereum: Ethereum
	}
}

export const hasEthereum = new BehaviorSubject(false)
