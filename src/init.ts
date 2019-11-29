import { route } from './store/route'
import { hasEthereum } from './store/has-ethereum'

interface Props {
	history: History
}

export const init = ({ history }: Props): void => {
	route.subscribe(x => history.pushState(undefined, '', x))

	if (window.ethereum) {
		hasEthereum.next(true)
	}
}
