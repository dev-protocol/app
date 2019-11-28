import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { filter, first } from 'rxjs/operators'
import { web3 } from './store/web3'
import Web3 from 'web3'
import { provider } from 'web3-core'

type Constructable<T, TP> = new (prop: TP) => T
interface Props {
	pushState: History['pushState']
	web3: Constructable<Web3, provider>
}

export const init = ({ pushState, web3: Web3js }: Props): void => {
	route.subscribe(x => pushState(undefined, '', x))

	if (window.ethereum) {
		hasEthereum.next(true)
	}

	hasEthereum
		.pipe(
			filter(x => x),
			first()
		)
		.subscribe(() => {
			const ins = new Web3js(window.ethereum)
			window.ethereum
				.enable()
				.catch()
				.then(() => {
					web3.next(ins)
				})
		})
}
