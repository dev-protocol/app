import { BehaviorSubject } from 'rxjs'
import { Eth } from 'web3x/eth'

export const web3Instantiated = new BehaviorSubject<Eth | undefined>(undefined)
