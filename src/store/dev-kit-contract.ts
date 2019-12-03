import { BehaviorSubject } from 'rxjs'
import { DevkitContract } from '@dev-protocol/dev-kit-js/esm/client'

export const devKitContract = new BehaviorSubject<DevkitContract | undefined>(
	undefined
)
