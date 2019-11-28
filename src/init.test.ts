import test from 'ava'
import { init } from './init'
import { route } from './store/route'

test('Subscribe the `route` and rewrite history', t => {
	t.plan(1)
	Object.defineProperty(window.history, 'pushState', {
		writable: true,
		value: (_: any, __: string, url: string): void => {
			if (url === '/test') {
				t.is(url, '/test')
			}
		}
	})
	init()
	route.next('/test')
})
