import { BehaviorSubject } from 'rxjs'

export const currentNetwork = new BehaviorSubject<string | undefined>(undefined)
