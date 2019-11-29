import test from 'ava'
import { a } from './a'
import { render, html } from 'lit-html'
import { removeExtraString } from '../../lib/test/remove-extra-string'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <a> element', t => {
	render(a({ href: '/test', content: 'Test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(el.getAttribute('href'), '/test')
	t.is(removeExtraString(el.innerHTML), 'Test')
})

test('Content is empty by default', t => {
	render(a({ href: '/test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(removeExtraString(el.innerHTML), '')
})

test('Handling a click event', t => {
	render(a({ href: '/test', onClick: () => t.pass() }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	el.click()
})

test('No handling a click event when not passing onClick option', t => {
	render(
		html`
			${a({ href: '/test' })} ${a({ href: '/test', onClick: () => t.pass() })}
		`,
		document.body
	)
	const els = document.body.querySelectorAll('a')
	t.plan(3)
	els.forEach(el => {
		el.addEventListener('click', () => t.pass())
		el.click()
	})
})
