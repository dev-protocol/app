import { BehaviorSubject } from 'rxjs'
import Web3 from 'web3'

const instance: Web3 = new Web3()

export const web3 = new BehaviorSubject(instance)
