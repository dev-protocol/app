export interface TxReceipt {
	blockHash: string
	blockNumber: number
	contractAddress: string | null
	cumulativeGasUsed: number
	events: any
	from: string
	gasUsed: number
	logsBloom: string
	status: boolean
	to: string
	transactionHash: string
	transactionIndex: number
}
export interface Tx {
	on: <T extends 'transactionHash' | 'confirmation' | 'error'>(
		type: T,
		callback: T extends 'transactionHash'
			? (hash: string) => void
			: T extends 'confirmation'
			? (status: number, receipt: TxReceipt) => void
			: (err: Error) => void
	) => Tx
}

export const txPromisify = async (
	tx: Tx,
	onTransactionHash?: (hash: string) => void
): Promise<[Error | null, any]> =>
	new Promise((resolve, reject) => {
		tx.on('transactionHash', hash => {
			if (onTransactionHash) {
				onTransactionHash(hash)
			}
		})
			.on('confirmation', (status, receipt) => {
				console.log(status, receipt)
				if (receipt.status) {
					return resolve([null, receipt])
				}
			})
			.on('error', (err: Error) => {
				reject(err)
			})
	})
