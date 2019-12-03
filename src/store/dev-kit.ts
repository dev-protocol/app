import { BehaviorSubject } from 'rxjs'
import { ContractFactory } from '@dev-protocol/dev-kit-js/esm/client'

export const devKit = new BehaviorSubject<ContractFactory | undefined>(
	undefined
)
