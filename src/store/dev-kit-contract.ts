import { BehaviorSubject } from 'rxjs'
import { DevkitContract } from '@devprtcl/dev-kit-js/esm/client'

export const devKitContract = new BehaviorSubject<DevkitContract | undefined>(
	undefined
)
