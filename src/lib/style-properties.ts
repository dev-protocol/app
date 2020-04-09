export const properties = {
	baseColor: ['#fff', '#000'],
	primaryColor: ['#e91e63'],
	primaryVariantColor: ['#ec407a'],
	secondaryColor: ['#ff9800', '#9575cd'],
	secondaryVariantColor: ['#ffc107'],
	onPrimaryColor: ['#fff'],
	onPrimaryVariantColor: ['#fff'],
	onSecondaryColor: ['#fff'],
	onSecondaryVariantColor: ['#fff'],
	surfaceColor: ['#f5f5f5', '#333'],
	onSurfaceColor: ['#000', '#fff'],
	surfaceVariantColor: ['#eaeaea', '#252525'],
	onSurfaceVariantColor: ['#929292', '#b7b7b7'],
	weakColor: ['#ccc', '#505050'],
	onSurfaceWeakColor: ['#a0a0a0'],
	fontColor: ['#000', '#fff'],
	fontSize: ['21px'],
	fontFamilyHeading: ["'Montserrat', sans-serif"],
	fontFamilyBody: ["'Poppins', sans-serif"],
	fontFamilyUI: ["'Ubuntu', sans-serif"],
	containerWidth: ['798px'],
	borderRadius: ['3px'],
}

export type CSSCustomPropertiesKey<T = typeof properties> = keyof T

export const asString = (name: CSSCustomPropertiesKey): string =>
	`--${`${name}`
		.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
		.toLowerCase()}`

export const asVar = (name: CSSCustomPropertiesKey): string =>
	`var(${asString(name)})`

type PrefersColorScheme = 'light' | 'dark'
const declaration = (
	name: CSSCustomPropertiesKey,
	sceme: PrefersColorScheme = 'light'
): string =>
	`${asString(name)}: ${properties[name][sceme === 'light' ? 0 : 1]};`

export const asDeclaration = (sceme: PrefersColorScheme = 'light'): string => {
	const keys = Object.keys(properties)
	const useDark = sceme === 'dark'

	return keys.reduce(
		(prev, name, i) =>
			((hasDark) =>
				((declare) => `${i === 0 ? '' : `${prev} `}${declare}`)(
					useDark && hasDark
						? declaration(name as CSSCustomPropertiesKey, 'dark')
						: useDark
						? ''
						: declaration(name as CSSCustomPropertiesKey, 'light')
				))(properties[name as CSSCustomPropertiesKey].length > 1),
		keys[0]
	)
}
