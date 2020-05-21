import { BehaviorSubject } from 'rxjs'
import { ContractFactory } from '@devprtcl/dev-kit-js/esm/client'

export const devKit = new BehaviorSubject<ContractFactory | undefined>(
	undefined
)
