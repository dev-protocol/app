import { BehaviorSubject } from 'rxjs'
import { DevkitContract } from '@devprtcl/dev-kit-js/esm/contract'

export const devKitContract = new BehaviorSubject<DevkitContract | undefined>(
	undefined
)
