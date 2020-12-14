import { BehaviorSubject } from 'rxjs'
import { ContractFactory } from '@devprotocol/dev-kit/esm/contract'

export const devKit = new BehaviorSubject<ContractFactory | undefined>(
	undefined
)
