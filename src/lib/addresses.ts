export interface Addresses {
	migration: string
	devLegacy: string
}

export const addresses = (network: string | undefined): Addresses | undefined =>
	network === 'main'
		? {
				migration: '0xA75453c61AdEA4db0a52AEDa47880f055bD3aF12',
				devLegacy: '0x98626E2C9231f03504273d55f397409deFD4a093',
		  }
		: undefined
