export interface Addresses {
	dev: string
	tryOut: string
	allocator: string
	lokcup: string
	withdraw: string
	propertyFactory: string
	marketFactory: string
	policyFactory: string
	policy: string
	migration: string
	devLegacy: string
	config: string
}

export const addresses = (network: string | undefined): Addresses | undefined =>
	network === 'main'
		? {
				dev: '0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26',
				tryOut: '0x7Eb78cAa271A2e8Fc25e75CA23574E9D9299310C',
				lokcup: '0x3d40fab11ee30E3aa1900cCfAFD190F0851a6157',
				allocator: '0xfeb69B0a5a0216611C2e0aCffc7a91D77b44d3ca',
				withdraw: '0x76fd43840c3944bFaa9DA24125d76d7A85CF5269',
				propertyFactory: '0xcB90FC08D405B75f5242cfE8f8D0397dE19D149c',
				marketFactory: '0xcf8f573c839aac9d62469cb8fcf5a30b187b6263',
				policyFactory: '0xca0f09564b1d0182b907352c631734d65c457d77',
				policy: '0x70251c6f2db87a33a3dfe05a6d093744b7d713ba',
				migration: '0xA75453c61AdEA4db0a52AEDa47880f055bD3aF12',
				devLegacy: '0x98626E2C9231f03504273d55f397409deFD4a093',
				config: '0x1D415aa39D647834786EB9B5a333A50e9935b796'
		  }
		: network === 'ropsten'
		? {
				dev: '0xEBDD63816B63f5c1Cc10A965372e542F41e8Adf1',
				tryOut: '0x1978a46c0B5B6e789023489fB173Df880e6A175F',
				lokcup: '0x8BCA5A841aFAD83b78c850de130dc046F3424736',
				allocator: '0xC801b373db167F1Cf3740dFF58367a822DC09c5b',
				withdraw: '0xb5D63C23488bCA1Aeac351D63168c28D0BF970C2',
				propertyFactory: '0x76B105Cbc45Ce36627aF7F1dDa77134568659cAa',
				marketFactory: '0x1cEFB47bAD45aF39b398050644ee6F4BEa6a9dEC',
				policyFactory: '0xd4B12F611Ba84D338E561975f013F7D5cDA48633',
				policy: '0x94B0FD2c3DdA4b8DB0d36ED74BdbE5024C712BE9',
				migration: '0x507376A2DE4bE8d4e5dD5fA9135f262566FF66B7',
				devLegacy: '0xD8Cf9F7b14D206C0E1f9c7375AFa791da6185295',
				config: '0xFCE583953481D168F82266c5Ba996d992879fA88'
		  }
		: undefined
