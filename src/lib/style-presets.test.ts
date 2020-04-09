import test from 'ava'
import {
	buttonWithPadding,
	container,
	large,
	exLarge,
	onlyMinWidth,
} from './style-presets'
import { processor } from './style'

const rmTab = (content: string): string => content.replace(/[\t|\n]/gm, '')

test('buttonWithPadding; Returns small size preset', async (t) => {
	const result = await processor`${buttonWithPadding({ size: 'small' })}`
	const expected = await processor`
		button {
			font-size: 0.8em;
			padding: 0.3rem 0.8rem
		}
	`
	t.is(rmTab(result), rmTab(expected))
})

test('container; Returns style for a container block', async (t) => {
	const result = await processor`${container('.test')}`
	const expected = await processor`
		.test {
			display: block;
			max-width: 58em;
			margin: auto;
			padding: 2.8rem;
			box-sizing: border-box;
		}
	`
	t.is(rmTab(result), rmTab(expected))
})

test('onlyMinWidth; Returns styles wrapped with a media query for specific width screen', async (t) => {
	const result = await processor`${onlyMinWidth(123)(`body {color: red}`)}`
	const expected = await processor`
	@media only screen and (min-width: 123px) {
		body {color: red}
	}
	`
	t.is(rmTab(result), rmTab(expected))
})

test('large; Returns styles wrapped with a media query for large screen', async (t) => {
	const result = await processor`${large(`body {color: red}`)}`
	const expected = await processor`
	@media only screen and (min-width: 414px) {
		body {color: red}
	}
	`
	t.is(rmTab(result), rmTab(expected))
})

test('exLarge; Returns styles wrapped with a media query for extra-large screen', async (t) => {
	const result = await processor`${exLarge(`body {color: red}`)}`
	const expected = await processor`
	@media only screen and (min-width: 768px) {
		body {color: red}
	}
	`
	t.is(rmTab(result), rmTab(expected))
})
