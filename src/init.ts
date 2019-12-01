import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { web3 } from './store/web3'

interface Props {
	history: History
}

export const init = async ({ history }: Props): Promise<void> => {
	route.subscribe(x => history.pushState(undefined, '', x))

	if (window.ethereum) {
		hasEthereum.next(true)
	}

	const { Eth } = await import('web3x/eth')
	web3.next(Eth)
}
