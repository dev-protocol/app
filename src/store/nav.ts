import { BehaviorSubject } from 'rxjs'

export interface Nav {
	active: boolean
	href: string
	label: string
}

export type NavItems = Array<Nav>

const items: NavItems = [
	{
		active: true,
		href: '/',
		label: 'list'
	}
]

export const nav = new BehaviorSubject(items)
