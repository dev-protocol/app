import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { render } from 'lit-html'
import { head } from './component/context/head'
import { contextByRoutes } from './lib/context-by-routes'
import { web3 } from './store/web3'
import { tryOut } from './abi/try-out'
import { filter } from 'rxjs/operators'
import { Ethereum } from './d/window'
import { web3TryOut } from './store/web3-try-out'
import { dev } from './abi/dev'
import { web3Dev } from './store/web3-dev'
import { devKitContract } from './store/dev-kit-contract'
const { document } = window

interface Props {
	history: History
	ethereum: Ethereum
}

export const init = async ({ history, ethereum }: Props): Promise<void> => {
	route.subscribe(x => history.pushState(undefined, '', x))

	route.subscribe(x => {
		render(head(contextByRoutes(x)), document.head)
	})

	hasEthereum.next(ethereum !== undefined)

	const { Web3, contractFactory } = await import('./lib/clients')
	hasEthereum.pipe(filter(x => x)).subscribe(() => {
		const libWeb3 = new Web3(ethereum)
		const libDevKit = contractFactory(ethereum)
		web3.next(libWeb3)
		devKitContract.next(libDevKit)

		const tryOutClient = new libWeb3.eth.Contract(
			tryOut,
			process.env.ADDRESSES_TRY_OUT
		)
		const devClient = new libWeb3.eth.Contract(dev, process.env.ADDRESSES_DEV)
		web3TryOut.next(tryOutClient)
		web3Dev.next(devClient)
	})
}
