import test from 'ava'
import { render } from 'lit-html'
import { route } from '../../store/route'
import { filter } from 'rxjs/operators'
import { link } from './link'
const { document } = window

test.beforeEach(() => {
	document.body.innerHTML = ''
})

test('Will call next route when a click event', t => {
	render(link({ href: '/test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.plan(1)
	route.pipe(filter(x => x === '/test')).subscribe(() => t.pass())
	el.click()
})

test('No handling a click event when the href starts with //', t => {
	render(link({ href: '//test.com' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.plan(1)
	route.subscribe(x => t.is(x, '/test'))
	el.click()
	render(link({ href: '/test' }), document.body)
	el.click()
})

test('Passing the classname option', t => {
	render(link({ href: '/test', class: 'test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(el.className, 'test')
})
