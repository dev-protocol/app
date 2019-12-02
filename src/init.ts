import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { web3 } from './store/web3'
import { render } from 'lit-html'
import { head } from './component/context/head'
import { contextByRoutes } from './lib/context-by-routes'
const { document } = window

interface Props {
	history: History
}

export const init = async ({ history }: Props): Promise<void> => {
	route.subscribe(x => history.pushState(undefined, '', x))

	route.subscribe(x => {
		render(head(contextByRoutes(x)), document.head)
	})

	if (window.ethereum) {
		hasEthereum.next(true)
	}

	const { Eth } = await import('web3x/eth')
	web3.next(Eth)
}
