import test from 'ava'
import { render } from 'lit-html'
import { filter } from 'rxjs/operators'
import { connectToWallet } from './connect-to-wallet'
import { Eth } from 'web3x/eth'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { web3Instantiated } from '../../store/web3-instantiated'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Click to enabling the wallet', async t =>
	new Promise(resolve => {
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

		web3Instantiated
			.pipe(filter(x => typeof x !== 'undefined' && 'dummy' in x))
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			.subscribe(instance => (instance as any).dummy())
		render(connectToWallet({ lib: Stub as any, ethereum }), document.body)
		const el = document.body.querySelector('button') as HTMLButtonElement
		el.click()
	}).then(() => t.pass()))

test('Content is "connect to wallet" by default', t => {
	render(connectToWallet({ lib: Eth, ethereum: undefined }), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'connect to wallet')
})

test('Set content when content is passed', t => {
	render(
		connectToWallet({
			content: 'Test',
			lib: Eth,
			ethereum: undefined
		}),
		document.body
	)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'Test')
})
