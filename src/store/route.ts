import { BehaviorSubject } from 'rxjs'

const { location } = window
const { pathname } = location

export const route = new BehaviorSubject(pathname)
