import test from 'ava'
import { toNaturalNumber } from './to-natural-number'
import BigNumber from 'bignumber.js'

test('Returns number divided by 10^18', t => {
	const result = toNaturalNumber('667687667987864534')
	t.is(
		result.toFixed(),
		new BigNumber('667687667987864534').div('1000000000000000000').toFixed()
	)
})
