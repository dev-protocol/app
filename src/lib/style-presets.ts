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
	}
`
export const buttonWithPadding = (
	{ size }: ButtonWithPaddingProps = {
		size: 'medium'
	}
): string => `
	button {
		font-size: ${`${size === 'medium' ? 1 : size === 'small' ? 0.8 : 1.4}rem`};
		padding: ${
			size === 'medium'
				? '0.5rem 1.1rem'
				: size === 'small'
				? '0.3rem 0.8rem'
				: '0.6rem 1.4rem'
		}
	}
`
