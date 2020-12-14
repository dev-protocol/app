import { BehaviorSubject } from 'rxjs'
import { DevkitContract } from '@devprotocol/dev-kit/esm/contract'

export const devKitContract = new BehaviorSubject<DevkitContract | undefined>(
	undefined
)
