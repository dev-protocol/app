import web3DetectNetwork from 'web3-detect-network'
import { provider } from 'web3-core'

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
): Promise<Error | null | TxReceipt> =>
	new Promise((resolve, reject) => {
		tx.on('transactionHash', hash => {
			if (onTransactionHash) {
				onTransactionHash(hash)
			}
		})
			.on('confirmation', (status, receipt) => {
				if (receipt.status) {
					return resolve(receipt)
				}

				reject(
					new Error(
						'There was a problem with the transaction. Please check your balance, or make sure you are not applying for staking cancellation.'
					)
				)
			})
			.on('error', (err: Error) => {
				reject(err)
			})
	})

export const getNetwork = async (prov: provider): Promise<DetectedNetwork> =>
	web3DetectNetwork(prov)
