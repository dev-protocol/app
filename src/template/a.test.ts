import test from 'ava'
import { a } from './a'
import { render } from 'lit-html'
import { removeComments } from '../lib/test/remove-comments'
import { route } from '../store/route'
import { filter } from 'rxjs/operators'

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <a> element', t => {
	render(a({ href: '/test', content: 'Test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(el.getAttribute('href'), '/test')
	t.is(removeComments(el.innerHTML), 'Test')
})

test('Content is empty by default', t => {
	render(a({ href: '/test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(removeComments(el.innerHTML), '')
})

test('Handling routing when a click evet', t => {
	render(a({ href: '/test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.plan(1)
	route.pipe(filter(x => x === '/test')).subscribe(() => t.pass())
	el.click()
})

test('No handling a click event when the href starts with //', t => {
	render(a({ href: '//test.com' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.plan(1)
	route.subscribe(x => t.is(x, '/test'))
	el.click()
	render(a({ href: '/test' }), document.body)
	el.click()
})
