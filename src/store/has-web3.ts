import { BehaviorSubject } from 'rxjs'
import Web3 from 'web3'

declare global {
	interface Window {
		web3: Web3
	}
}

export const hasWeb3 = new BehaviorSubject(false)
