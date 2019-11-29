import test from 'ava'
import { render, html } from 'lit-html'
import { removeComments } from '../../lib/test/remove-comments'
import { button } from './button'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <button> element', t => {
	render(button({ content: 'Test' }), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeComments(el.innerHTML), 'Test')
})

test('Content is empty by default', t => {
	render(button({}), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(removeComments(el.innerHTML), '')
})

test('Disabled is false by default', t => {
	render(button({}), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(el.hasAttribute('disabled'), false)
})

test('Disabled attribute is added when passed disabled option', t => {
	render(button({ disabled: true }), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	t.is(el.hasAttribute('disabled'), true)
})

test('Handling a click event', t => {
	render(button({ onClick: () => t.pass() }), document.body)
	const el = document.body.querySelector('button') as HTMLButtonElement
	el.click()
})

test('No handling a click event when not passing onClick option', t => {
	render(
		html`
			${button({})}
			${button({
				onClick: () => t.pass()
			})}
		`,
		document.body
	)
	const els = document.body.querySelectorAll('button')
	t.plan(3)
	els.forEach(el => {
		el.addEventListener('click', () => t.pass())
		el.click()
	})
})
