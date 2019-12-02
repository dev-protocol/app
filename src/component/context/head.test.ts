import test from 'ava'
import { render } from 'lit-html'
import { head } from './head'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { contextByRoutes } from '../../lib/context-by-routes'
const { document } = window

test.beforeEach(() => {
	document.head.innerHTML = ''
})

test('Render the <head>', t => {
	render(head(contextByRoutes('/')), document.head)
	t.truthy(document.head.querySelector('meta'))
	t.truthy(document.head.querySelector('title'))
	t.truthy(document.head.querySelector('link'))
	t.truthy(document.head.querySelector('style'))
})

test('Re-writes <head> by the context', t => {
	render(head(contextByRoutes('/')), document.head)
	const el = document.head.querySelector('title') as HTMLTitleElement
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/').documentTitle)
	render(head(contextByRoutes('/xxx')), document.head)
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/xxx').documentTitle)
})
