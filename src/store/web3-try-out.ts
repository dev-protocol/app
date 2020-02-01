import { BehaviorSubject } from 'rxjs'
import Web3 from 'web3'

export const web3TryOut = new BehaviorSubject<
	InstanceType<Web3['eth']['Contract']> | undefined
>(undefined)
