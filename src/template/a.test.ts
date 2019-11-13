import test from 'ava'
import { a } from './a'
import { render } from 'lit-html'
import { removeComments } from '../lib/test/remove-comments'

test('Returns template for <a> element', t => {
	render(a({ href: '/test', content: 'Test' }), document.body)
	const el = document.body.querySelector('a') as HTMLAnchorElement
	t.is(el.getAttribute('href'), '/test')
	t.is(removeComments(el.innerHTML), 'Test')
})

test.todo('Handling routing when a click evet')

test.todo('No handling a click event when the href starts with //')
