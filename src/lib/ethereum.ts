export interface Tx {
	on: <T extends 'transactionHash' | 'confirmation' | 'error'>(
		type: T,
		callback: T extends 'transactionHash'
			? (hash: string) => void
			: T extends 'confirmation'
			? (err: Error, receipt: any) => void
			: (err: Error) => void
	) => Tx
}

export const txPromisify = async (
	tx: Tx,
	onTransactionHash?: (hash: string) => void
): Promise<[Error, any]> =>
	new Promise((resolve, reject) => {
		tx.on('transactionHash', hash => {
			if (onTransactionHash) {
				onTransactionHash(hash)
			}
		})
			.on('confirmation', (err, receipt) => {
				resolve([err, receipt])
			})
			.on('error', (err: Error) => {
				reject(err)
			})
	})
