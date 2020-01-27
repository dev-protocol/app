import { Subject } from 'rxjs'

export const promisify = async <T>(
	subject: Subject<T>
): Promise<NonNullable<T>> =>
	new Promise<NonNullable<T>>(resolve => {
		const sbsc = subject.subscribe(x => {
			if (x === undefined || x === null) {
				return
			}

			sbsc.unsubscribe()
			resolve(x as NonNullable<T>)
		})
	})
