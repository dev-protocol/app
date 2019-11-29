import test from 'ava'
import { render } from 'lit-html'
import { filter } from 'rxjs/operators'
import { web3 } from '../../store/web3'
import { connectToWallet } from './connect-to-wallet'
import Web3 from 'web3'
import { removeComments } from '../../lib/test/remove-comments'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Click to enabling the wallet', async t => {
	await new Promise(resolve => {
		const ethereum = {
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
				this.dummy = provider.dummy
			}
		}

		web3
			.pipe(
				filter(x => {
					t.log((x as any).dummy)
					return 'dummy' in x
				})
			)
			.subscribe(ins => (ins as any).dummy())
		render(connectToWallet({ web3: Stub as any, ethereum }), document.body)
		const el = document.body.querySelector('button') as HTMLButtonElement
		el.click()
	})
	t.pass()
})

test('Content is "connect to wallet" by default', t => {
	render(
		connectToWallet({ web3: Web3 as any, ethereum: undefined }),
		document.body
	)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeComments(el.innerHTML), 'connect to wallet')
})

test('Set content when content is passed', t => {
	render(
		connectToWallet({
			content: 'Test',
			web3: Web3 as any,
			ethereum: undefined
		}),
		document.body
	)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeComments(el.innerHTML), 'Test')
})
