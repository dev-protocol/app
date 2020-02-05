import { promisify } from './promisify'
import { web3 } from '../store/web3'
import { walletConnected } from '../store/wallet-connected'
import Web3 from 'web3'

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
				reject(new Error(err.message))
			})
	})

export const getNetwork = async (libWeb3: Web3): Promise<string> =>
	libWeb3.eth.net.getNetworkType()

export const getAccount = async (): Promise<string> =>
	promisify(web3)
		.then(async libWeb3 => libWeb3.eth.getAccounts())
		.then(([account]) => account)

export const connect = async (ethereum: Window['ethereum']): Promise<void> =>
	ethereum
		.enable()
		.then(() => {
			walletConnected.next(true)
		})
		.catch(() => {
			walletConnected.next(false)
		})
