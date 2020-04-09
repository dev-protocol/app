import test from 'ava'
import { render } from 'lit-html'
import { filter } from 'rxjs/operators'
import { connectToWallet } from './connect-to-wallet'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { devKitContract } from '../../store/dev-kit-contract'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Click to enabling the wallet', async (t) => {
	new Promise((resolve) => {
		const ethereum = {
			enable: async () => {
				resolve()
			},
		}

		devKitContract
			.pipe(filter((x) => typeof x !== 'undefined' && 'dummy' in x))
			.subscribe(() => resolve())
		render(connectToWallet({ ethereum }), document.body)
		const el = document.body.querySelector('button') as HTMLButtonElement
		el.click()
	}).then(() => t.pass())
})

test('Content is "connect to wallet" by default', (t) => {
	render(connectToWallet({ ethereum: undefined }), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'connect to wallet')
})

test('Set content when content is passed', (t) => {
	render(
		connectToWallet({
			content: 'Test',
			ethereum: undefined,
		}),
		document.body
	)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'Test')
})
