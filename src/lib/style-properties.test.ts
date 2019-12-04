import test from 'ava'
import {
	properties,
	asString,
	asVar,
	asDeclaration,
	CSSCustomPropertiesKey
} from './style-properties'

test('`asString` returns string as a format of CSS custom properties key', t => {
	const regex = /^--([a-z]|-)+$/
	// E.g, following formula, is correct.
	t.regex('--font-color', regex)
	Object.keys(properties).map(key => t.regex(asString(key as any), regex))
})

test('`asVar` returns string as a format of calling CSS custom properties', t => {
	const regex = /^var\(--([a-z]|-)+\)$/
	// E.g, following formula, is correct.
	t.regex('var(--font-color)', regex)
	Object.keys(properties).map(key => t.regex(asVar(key as any), regex))
})

test('`asDeclaration` returns string as a format of declaring CSS custom properties', t => {
	const regex = /^--([a-z]|-)+:((?!;).)+;$/
	// E.g, following formula, is correct.
	t.regex('--font-color: rgba(233, 30, 99, 0.8);', regex)
	asDeclaration()
		.split(';')
		.filter(x => x)
		.map(x => `${x.trim()};`)
		.map(x => t.regex(x, regex))
})

test('`asDeclaration` returns string as a format of declaring CSS custom properties for the dark theme when `dark` is passed', t => {
	const hasDarkKeys = Object.keys(properties).filter(
		x => properties[x as CSSCustomPropertiesKey].length > 1
	)
	asDeclaration('dark')
		.split(';')
		.filter(x => /\w/.test(x))
		.map(x => x.replace(/^.*:(.*)/, '$1').trim())
		.map((x, i) =>
			t.is(properties[hasDarkKeys[i] as CSSCustomPropertiesKey][1], x as any)
		)
})

test('`asDeclaration` returns string as a format of declaring CSS custom properties for the light theme when `light` is passed', t => {
	const hasLightKeys = Object.keys(properties).filter(
		x => properties[x as CSSCustomPropertiesKey].length > 0
	)
	asDeclaration('light')
		.split(';')
		.filter(x => /\w/.test(x))
		.map(x => x.replace(/^.*:(.*)/, '$1').trim())
		.map((x, i) =>
			t.is(properties[hasLightKeys[i] as CSSCustomPropertiesKey][0], x as any)
		)
})

test('`asDeclaration` returns string as a format of declaring CSS custom properties for the light theme by default', t => {
	const hasLightKeys = Object.keys(properties).filter(
		x => properties[x as CSSCustomPropertiesKey].length > 0
	)
	asDeclaration()
		.split(';')
		.filter(x => /\w/.test(x))
		.map(x => x.replace(/^.*:(.*)/, '$1').trim())
		.map((x, i) =>
			t.is(properties[hasLightKeys[i] as CSSCustomPropertiesKey][0], x as any)
		)
})
