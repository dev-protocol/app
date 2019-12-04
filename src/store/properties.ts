import { BehaviorSubject } from 'rxjs'

export interface DevProperty {
	address: string
	name: string
}

export interface DevMarketMappedProperties {
	[address: string]: DevProperty[]
}

export const properties = new BehaviorSubject<DevMarketMappedProperties>({
	'0x0000': [
		{
			address: '0x0001',
			name: 'name a'
		},
		{
			address: '0x0002',
			name: 'name b'
		},
		{
			address: '0x0003',
			name: 'name c'
		},
		{
			address: '0x0004',
			name: 'name d'
		},
		{
			address: '0x0005',
			name: 'name e'
		}
	]
})
