import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { render } from 'lit-html'
import { head } from './component/context/head'
import { contextByRoutes } from './lib/context-by-routes'
import { devKit } from './store/dev-kit'
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

	const { contractFactory } = await import('@dev-protocol/dev-kit-js/esm')
	devKit.next(contractFactory)
}
