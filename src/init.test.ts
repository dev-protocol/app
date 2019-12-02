import test from 'ava'
import { init } from './init'
import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'
import { filter } from 'rxjs/operators'
import { web3 } from './store/web3'
import { removeExtraString } from './lib/test/remove-extra-string'
import { contextByRoutes } from './lib/context-by-routes'
const { document } = window

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
		pushState: pushState((_: any, __: string, url: string): void => {
			if (url === '/test') {
				t.is(url, '/test')
			}
		})
	}

	init({ history: stub as any })
	route.next('/test')
})

test('Subscribe `route` and re-writes <head>', t => {
	route.next('/')
	init({
		history: {
			pushState: pushState()
		} as any
	})
	const el = document.head.querySelector('title') as HTMLTitleElement
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/').documentTitle)
	route.next('/xxx')
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/xxx').documentTitle)
})

test('When includes ethereum in the window, then emit true with `hasEthereum`', async t =>
	new Promise(resolve => {
		window.ethereum = {
			enable: async () => {}
		} as any
		hasEthereum.pipe(filter(x => x)).subscribe(() => {
			resolve()
		})
		init({
			history: {
				pushState: pushState()
			} as any
		})
	}).then(() => t.pass()))

test('Dynamic import Eth from `web3x/eth`, then emit Eth with `web3`', async t =>
	new Promise(resolve => {
		web3.pipe(filter(x => typeof x !== 'undefined')).subscribe(() => resolve())
		init({
			history: {
				pushState: pushState()
			} as any
		})
	}).then(() => t.pass()))
