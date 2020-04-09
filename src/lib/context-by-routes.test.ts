import test from 'ava'
import { contextByRoutes } from './context-by-routes'

test('Returns main page context when the URL is `/`', (t) => {
	const result = contextByRoutes('/')
	const expected = { url: '/', documentTitle: 'Dev Protocol' }
	t.deepEqual(result, expected)
})

test('Returns 404 page context when the URL does not match any routes', (t) => {
	const result = contextByRoutes('/xxx')
	const expected = { url: '/xxx', documentTitle: 'Page is not found' }
	t.deepEqual(result, expected)
})
