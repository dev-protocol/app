import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { render } from 'lit-html'
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
import { rootStyle } from './lib/style-presets'
const { document } = window

interface Props {
	history: History
	ethereum: Ethereum
}

const createElementWhenUndefined = (name: string): HTMLElement =>
	document.head.querySelector(name) ??
	((t) => document.head.appendChild(t))(document.createElement(name))

export const init = async ({ history, ethereum }: Props): Promise<void> => {
	render(rootStyle, createElementWhenUndefined('style'))

	route.subscribe((x) => history.pushState(undefined, '', x))

	route.subscribe((x) => {
		render(
			contextByRoutes(x).documentTitle,
			createElementWhenUndefined('title')
		)
	})

	hasEthereum.next(ethereum !== undefined)

	const { Web3, contractFactory } = await import('./lib/clients')
	hasEthereum.pipe(filter((x) => x)).subscribe(async () => {
		const libWeb3 = new Web3(ethereum)
		const libDevKit = contractFactory(ethereum)
		const net = await getNetwork(libWeb3)
		web3.next(libWeb3)
		devKitContract.next(libDevKit)

		const tryOutClient = new libWeb3.eth.Contract(
			tryOut,
			addresses(net)?.tryOut
		)
		const devClient = new libWeb3.eth.Contract(dev, addresses(net)?.dev)
		web3TryOut.next(tryOutClient)
		web3Dev.next(devClient)
		currentNetwork.next(net)
	})
}
