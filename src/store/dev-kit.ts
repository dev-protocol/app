import { BehaviorSubject } from 'rxjs'
import { ContractFactory } from '@devprtcl/dev-kit-js/esm/contract'

export const devKit = new BehaviorSubject<ContractFactory | undefined>(
	undefined
)
