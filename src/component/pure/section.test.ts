import test from 'ava'
import { section } from './section'
import { render, html } from 'lit-html'
import { removeExtraString } from '../../lib/test/remove-extra-string'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <section> element', (t) => {
	render(
		section(() => html` <p>Test</p> `),
		document.body
	)
	const el = document.body.querySelector('section > p') as HTMLElement
	t.is(removeExtraString(el.innerHTML), 'Test')
})

test('Returns template for <section> element with ID when passed 2nd args', (t) => {
	render(
		section(() => html` <p>Test</p> `, 'test'),
		document.body
	)
	const el = document.body.querySelector('section#test > p') as HTMLElement
	t.is(removeExtraString(el.innerHTML), 'Test')
})
