import { BehaviorSubject } from 'rxjs'
import { Eth } from 'web3x/eth'
import { EthereumProvider } from 'web3x/providers/ethereum-provider'

export type EthereumClass = new (prov: EthereumProvider) => Eth

export const web3 = new BehaviorSubject<EthereumClass | undefined>(undefined)
