interface Addresses {
	dev: string
	tryOut: string
	lokcup: string
	migration: string
	devLegacy: string
}

export const addresses = (network: string | undefined): Addresses | undefined =>
	network === 'mainnet'
		? {
				dev: '0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26',
				tryOut: '',
				lokcup: '0x71A25Bb05C68037B867E165c229D0c30e73f07Ad',
				migration: '0xA75453c61AdEA4db0a52AEDa47880f055bD3aF12',
				devLegacy: '0x98626E2C9231f03504273d55f397409deFD4a093'
		  }
		: network === 'ropsten'
		? {
				dev: '0xEBDD63816B63f5c1Cc10A965372e542F41e8Adf1',
				tryOut: '0x1978a46c0B5B6e789023489fB173Df880e6A175F',
				lokcup: '0x8BCA5A841aFAD83b78c850de130dc046F3424736',
				migration: '0x507376A2DE4bE8d4e5dD5fA9135f262566FF66B7',
				devLegacy: '0xD8Cf9F7b14D206C0E1f9c7375AFa791da6185295'
		  }
		: undefined
