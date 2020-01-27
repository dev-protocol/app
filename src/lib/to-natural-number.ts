import BigNumber from 'bignumber.js'

const basis = new BigNumber(10).pow(18)

export const toNaturalNumber = (num: string): BigNumber =>
	new BigNumber(num).times(basis)
