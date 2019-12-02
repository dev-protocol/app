import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { web3 } from './store/web3'
import { render } from 'lit-html'
import { head } from './component/reactive/head'
const { document } = window

interface Props {
	history: History
}

export const init = async ({ history }: Props): Promise<void> => {
	render(head(), document.head)
	route.subscribe(x => history.pushState(undefined, '', x))

	if (window.ethereum) {
		hasEthereum.next(true)
	}

	const { Eth } = await import('web3x/eth')
	web3.next(Eth)
}
