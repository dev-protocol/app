import test from 'ava'
import { render, html } from 'lit-html'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { nav } from './nav'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <nav> element', t => {
	const items = [
		html`
			<a>1</a>
		`,
		html`
			<a>2</a>
		`,
		html`
			<a>3</a>
		`
	]
	render(nav({ items }), document.body)
	const el = document.body.querySelector('nav') as HTMLElement
	const ul = el.querySelector('ul') as HTMLUListElement
	const a = ul.querySelectorAll('a')
	a.forEach((x, i) => {
		t.is(removeExtraString(x.innerHTML), `${i + 1}`)
	})
})
