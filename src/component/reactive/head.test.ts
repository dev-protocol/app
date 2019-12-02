import test from 'ava'
import { render } from 'lit-html'
import { head } from './head'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { route } from '../../store/route'
import { contextByRoutes } from '../../lib/context-by-routes'
const { document } = window

test.beforeEach(() => {
	document.head.innerHTML = ''
})

test('Render the <head>', t => {
	render(head(), document.head)
	t.truthy(document.head.querySelector('meta'))
	t.truthy(document.head.querySelector('title'))
	t.truthy(document.head.querySelector('link'))
	t.truthy(document.head.querySelector('style'))
})

test('Subscribe `route` and re-writes <head>', t => {
	route.next('/')
	render(head(), document.head)
	const el = document.head.querySelector('title') as HTMLTitleElement
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/').documentTitle)
	route.next('/xxx')
	t.is(removeExtraString(el.innerHTML), contextByRoutes('/xxx').documentTitle)
})
