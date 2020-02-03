import { BehaviorSubject } from 'rxjs'
import Web3 from 'web3'

export const web3 = new BehaviorSubject<Web3 | undefined>(undefined)
