import test from 'ava'
import { BehaviorSubject } from 'rxjs'
import { promisify } from './promisify'

test('Returns Promise that resolves if the Subject has a value other than undefined and null', async (t) => {
	const subs = new BehaviorSubject<number | undefined | null>(undefined)
	const res = await new Promise((resolve) => {
		promisify(subs).then((x) => {
			resolve(x)
		})
		subs.next(null)
		subs.next(undefined)
		subs.next(9)
	})
	t.is(res, 9)
})
