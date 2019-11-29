import test from 'ava'
import { init } from './init'
import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { filter } from 'rxjs/operators'
import Web3 from 'web3'
import { web3 } from './store/web3'

const pushState = (cb?: (_: any, __: string, url: string) => void) => (
	_: any,
	__: string,
	url: string
): void => {
	if (cb) {
		cb(_, __, url)
	}
}

test.afterEach(() => {
	hasEthereum.next(false)
})

test('Subscribe the `route` and rewrite history', t => {
	t.plan(1)
	const stub = {
		history: pushState((_: any, __: string, url: string): void => {
			if (url === '/test') {
				t.is(url, '/test')
			}
		})
	}

	init({ history: stub as any, web3: Web3 })
	route.next('/test')
})

test.serial(
	'When includes ethereum in the window, then emit true with `hasEthereum`',
	async t => {
		await new Promise(resolve => {
			window.ethereum = {
				enable: async () => true
			}
			hasEthereum.pipe(filter(x => x)).subscribe(() => {
				resolve()
			})
			init({
				history: {
					pushState: pushState()
				} as any,
				web3: Web3
			})
		})
		t.pass()
	}
)

test.serial('Subscribe the `hasEthereum` and enabling ethereum', async t => {
	await new Promise(resolve => {
		window.ethereum = {
			enable: async () => {
				resolve()
			}
		}
		init({
			history: {
				pushState: pushState()
			} as any,
			web3: Web3
		})
	})
	t.pass()
})

test.serial(
	'Enabled ethereum, then emit web3 instance with `web3`',
	async t => {
		await new Promise(resolve => {
			window.ethereum = {
				enable: async () => true,
				dummy: () => {
					resolve()
				}
			}
			type Dummy = {
				dummy: () => void
			}
			class Stub {
				public dummy: () => void
				constructor(provider: Dummy) {
					t.log(provider)
					this.dummy = provider.dummy
				}
			}

			web3.pipe(filter(x => 'dummy' in x)).subscribe(ins => {
				;(ins as any).dummy()
			})
			init({
				history: {
					pushState: pushState()
				} as any,
				web3: Stub as any
			})
		})
		t.pass()
	}
)
