import { BehaviorSubject } from 'rxjs'

declare global {
	interface Window {
		ethereum: any
	}
}

export const hasEthereum = new BehaviorSubject(false)
