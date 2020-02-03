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
import { currentNetwork } from './store/current-network'
import { getNetwork } from './lib/ethereum'
import { addresses } from './lib/addresses'
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
	hasEthereum.pipe(filter(x => x)).subscribe(async () => {
		const libWeb3 = new Web3(ethereum)
		const libDevKit = contractFactory(ethereum)
		const net = await getNetwork(libWeb3.currentProvider)
		web3.next(libWeb3)
		devKitContract.next(libDevKit)

		const tryOutClient = new libWeb3.eth.Contract(
			tryOut,
			addresses(net.type)?.tryOut
		)
		const devClient = new libWeb3.eth.Contract(dev, addresses(net.type)?.dev)
		web3TryOut.next(tryOutClient)
		web3Dev.next(devClient)
		currentNetwork.next(net)
	})
}
