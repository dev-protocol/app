import { asVar, asDeclaration } from './style-properties'

interface ButtonWithPaddingProps {
	size: 'small' | 'medium' | 'large'
}
export const button = `
	button {
		cursor: pointer;
	}
`
export const buttonWithNoBorder = `
	button {
		border: 0;
		outline: 0;
	}
`
export const buttonWithPadding = (
	{ size }: ButtonWithPaddingProps = {
		size: 'medium'
	}
): string => `
	button {
		font-size: ${`${size === 'medium' ? 1 : size === 'small' ? 0.8 : 1.4}em`};
		padding: ${
			size === 'medium'
				? '0.5rem 1.1rem'
				: size === 'small'
				? '0.3rem 0.8rem'
				: '0.6rem 1.4rem'
		}
	}
`

export const a = `
	a {
		color: ${asVar('secondaryColor')};
		text-decoration: none;
	}
`

export const container = (selector: string): string => `
	${selector} {
		display: block;
		max-width: 58em;
		margin: auto;
		padding: 2.8rem;
		box-sizing: border-box;
	}
`

export const heading = (): string => `
	h1, h2, h3 {
		font-family: ${asVar('fontFamilyHeading')};
		font-weight: 500;
	}
`

export const onlyMinWidth = (px: number): ((style: string) => string) => (
	style: string
): string => `
	@media only screen and (min-width: ${px}px) {
		${style}
	}
`

export const large = (style: string): string => onlyMinWidth(414)(style)

export const exLarge = (style: string): string => onlyMinWidth(768)(style)

export const rootStyle = `
	:root {
		${asDeclaration()}
	}
	@media (prefers-color-scheme: dark) {
		:root {
			${asDeclaration('dark')}
		}
	}
	body {
		margin: 0;
		background: ${asVar('baseColor')};
		font-size: ${asVar('fontSize')};
		font-family: ${asVar('fontFamilyBody')};
		color: ${asVar('fontColor')};
	}
	a {
		color: ${asVar('secondaryColor')};
	}
`
