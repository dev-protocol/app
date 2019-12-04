import { BehaviorSubject } from 'rxjs'

export interface DevMarket {
	address: string
	name: string
}

export const markets = new BehaviorSubject<DevMarket[]>([
	{
		address: '0x0000',
		name: 'npm'
	}
])
