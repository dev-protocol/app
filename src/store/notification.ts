import { BehaviorSubject } from 'rxjs'

export type Notification = {
	type: 'info' | 'failed' | 'succeeded'
	message: string
}

export const notification = new BehaviorSubject<Notification | undefined>(
	undefined
)
