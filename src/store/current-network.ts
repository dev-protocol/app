import { BehaviorSubject } from 'rxjs'

export const currentNetwork = new BehaviorSubject<DetectedNetwork | undefined>(
	undefined
)
