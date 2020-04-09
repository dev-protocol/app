import { Subject } from 'rxjs'
import { filter, take } from 'rxjs/operators'

export const promisify = async <T>(
	subject: Subject<T>
): Promise<NonNullable<T>> =>
	new Promise<NonNullable<T>>((resolve) => {
		subject
			.pipe(
				filter((x) => x !== undefined && x !== null),
				take(1)
			)
			.subscribe((x) => {
				resolve(x as NonNullable<T>)
			})
	})
