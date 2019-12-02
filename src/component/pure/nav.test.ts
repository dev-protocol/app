import test from 'ava'
import { nav } from './nav'
import { render, html } from 'lit-html'
import { removeExtraString } from '../../lib/test/remove-extra-string'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Returns template for <nav> element', t => {
	render(
		nav(
			() =>
				html`
					Test
				`
		),
		document.body
	)
	const el = document.body.querySelector('nav') as HTMLElement
	t.is(removeExtraString(el.innerHTML), 'Test')
})
