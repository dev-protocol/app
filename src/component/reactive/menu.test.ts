import test from 'ava'
import { render } from 'lit-html'
import { menu } from './menu'
import { removeExtraString } from '../../lib/test/remove-extra-string'
import { nav } from '../../store/nav'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Subscribe `nav` and render it', t => {
	render(menu(), document.body)
	const els = document.body.querySelectorAll('nav > ul > li > a')
	els.forEach((el, i) => {
		t.is(removeExtraString(el.innerHTML), nav.value[i].label)
	})
})

test('Subscribe `nav` and re-render it', t => {
	render(menu(), document.body)
	nav.next([
		...nav.value,
		...[
			{
				active: false,
				label: 'test',
				href: '/test'
			}
		]
	])
	const els = document.body.querySelectorAll('nav > ul > li > a')
	els.forEach((el, i) => {
		t.is(removeExtraString(el.innerHTML), nav.value[i].label)
	})
})

test('Render class name for an active item by specified options', t => {
	render(menu({ activeClass: 'test-active' }), document.body)
	const els = document.body.querySelectorAll('nav > ul > li > a')
	els.forEach((el, i) => {
		t.is(el.className, nav.value[i].active ? 'test-active' : '')
	})
})

test('The active item class name is "active" by default', t => {
	render(menu(), document.body)
	const els = document.body.querySelectorAll('nav > ul > li > a')
	els.forEach((el, i) => {
		t.is(el.className, nav.value[i].active ? 'active' : '')
	})
})
