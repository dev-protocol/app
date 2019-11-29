import test from 'ava'
import { render } from 'lit-html'
import { template } from './connect-button'
import { hasEthereum } from '../../store/has-ethereum'
import { removeExtraString } from '../../lib/test/remove-extra-string'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Show disabled button when not found ethereum', t => {
	hasEthereum.next(false)
	render(
		template({
			ethereum: {
				isConnected: () => false
			} as any
		}),
		document.body
	)
	const el = document.querySelector('button') as HTMLButtonElement
	t.is(el.hasAttribute('disabled'), true)
})

test('Subscribe `hasEthereum` and `web3`, then show the already connected button when has ethereum and already connected it', t => {
	hasEthereum.next(true)
	render(
		template({
			ethereum: {
				isConnected: () => true
			} as any
		}),
		document.body
	)
	const el = document.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'connected')
})

test('Subscribe `hasEthereum` and `web3`, then show to the connect button when has ethereum and not connected it', t => {
	hasEthereum.next(true)
	render(
		template({
			ethereum: {
				isConnected: () => false
			} as any
		}),
		document.body
	)
	const el = document.querySelector('button') as HTMLButtonElement
	t.is(removeExtraString(el.innerHTML), 'connect to wallet')
})
