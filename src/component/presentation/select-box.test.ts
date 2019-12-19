/* eslint-disable @typescript-eslint/no-empty-function */
import test from 'ava'
import { render, html } from 'lit-html'
import { SelectBoxItemsSubject, selectBox } from './select-box'
import { BehaviorSubject } from 'rxjs'
import { removeExtraString } from '../../lib/test/remove-extra-string'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

const subject = (select = ''): SelectBoxItemsSubject<string> =>
	new BehaviorSubject([
		{
			selected: select === 'Cake',
			template: html`
				Cake
			`,
			data: 'Cake'
		},
		{
			selected: select === 'Fruit',
			template: html`
				Fruit
			`,
			data: 'Fruit'
		}
	])

test('Subscribe a BehaviorSubject, and render to the selected-element as a currently selected item', t => {
	const handler = () => () => {}
	render(
		html`
			${selectBox({ subject: subject('Cake'), handler })}
		`,
		document.body
	)
	const el = document.body.querySelector(
		'[role=listbox] [role=option][aria-selected=true]'
	) as HTMLElement
	t.log(document.body.outerHTML)
	t.is(removeExtraString(el.innerHTML), 'Cake')
})

test('Subscribe a BehaviorSubject, and request to select when no item selected', t => {
	const handler = () => () => {}
	render(
		html`
			${selectBox({ subject: subject(), handler })}
		`,
		document.body
	)
	const el = document.body.querySelector(
		'[role=listbox] .item:not([role=option])'
	) as HTMLElement
	t.is(removeExtraString(el.innerHTML), '(select one)')
})

test('Subscribe a BehaviorSubject, and render to the listed-element as a no selected item', t => {
	const handler = () => () => {}
	render(
		html`
			${selectBox({ subject: subject('Cake'), handler })}
		`,
		document.body
	)
	const el = document.body.querySelector(
		'[role=listbox] [role=option]:not([aria-selected])'
	) as HTMLElement
	t.is(removeExtraString(el.innerHTML), 'Fruit')
})

test('Calling handler function when the items click', t => {
	const handler = () => () => {
		t.pass()
	}

	render(
		html`
			${selectBox({ subject: subject(), handler })}
		`,
		document.body
	)
	const el = document.body.querySelector(
		'[role=listbox] [role=option]:not([aria-selected])'
	) as HTMLElement
	el.click()
})

test('Subscribe a BehaviorSubject, and re-render items.', t => {
	const handler = () => () => {}
	const data = subject('Cake')
	render(
		html`
			${selectBox({ subject: data, handler })}
		`,
		document.body
	)
	const selected = (): HTMLElement =>
		document.body.querySelector(
			'[role=listbox] [role=option][aria-selected=true]'
		) as HTMLElement
	const list = (): HTMLElement =>
		document.body.querySelector(
			'[role=listbox] [role=option]:not([aria-selected])'
		) as HTMLElement

	t.is(removeExtraString(selected().innerHTML), 'Cake')
	t.is(removeExtraString(list().innerHTML), 'Fruit')

	data.next([
		{
			selected: false,
			template: html`
				Cake
			`,
			data: 'Cake'
		},
		{
			selected: true,
			template: html`
				Fruit
			`,
			data: 'Fruit'
		}
	])

	t.is(removeExtraString(selected().innerHTML), 'Fruit')
	t.is(removeExtraString(list().innerHTML), 'Cake')
})

test('Toggle the element by the click', t => {
	const handler = () => () => {}
	render(
		html`
			${selectBox({ subject: subject(), handler })}
		`,
		document.body
	)
	const listbox = document.body.querySelector('[role=listbox]') as HTMLElement

	t.false(listbox.hasAttribute('opened'))

	listbox.click()

	t.true(listbox.hasAttribute('opened'))
})
