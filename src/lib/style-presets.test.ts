import test from 'ava'
import { buttonWithPadding } from './style-presets'
import { processor } from './style'

test('buttonWithPadding; Returns small size preset', async t => {
	const result = await processor`${buttonWithPadding({ size: 'small' })}`
	const expected = await processor`
		button {
			font-size: 0.8rem;
			padding: 0.3rem 0.8rem
		}
	`
	t.is(result, expected)
})
