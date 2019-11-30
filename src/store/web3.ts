import { BehaviorSubject } from 'rxjs'
import Web3 from 'web3'
const { Web3: Web3js } = window

const instance: Web3 = new Web3js()

export const web3 = new BehaviorSubject(instance)
