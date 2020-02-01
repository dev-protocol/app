interface DetectedNetwork {
	id: 1 | 2 | 3 | 42 | 4 | null
	type: 'mainnet' | 'morden' | 'ropsten' | 'kovan' | 'rinkeby' | 'unknown'
}

declare module 'web3-detect-network' {
	import { provider } from 'web3-core'

	function detectNetwork(provider: provider): Promise<DetectedNetwork>

	export = detectNetwork
}
