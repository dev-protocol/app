import { xApp } from './element/x-app'
import { route } from './store/route'
import { hasWeb3 } from './store/has-web3'
import { hasEthereum } from './store/has-ethereum'
import { filter } from 'rxjs/operators'
import Web3 from 'web3'
import { web3 } from './store/web3'
const { customElements, history } = window

customElements.define('x-app', xApp)

route.subscribe(x => history.pushState(undefined, '', x))

window.addEventListener('load', () => {
	if (window.ethereum) {
		hasEthereum.next(true)
	} else if (window.web3) {
		hasWeb3.next(true)
	}
})

hasEthereum.pipe(filter(x => x)).subscribe(() => {
	const ins = new Web3(window.ethereum)
	window.ethereum
		.enable()
		.catch()
		.then(() => {
			web3.next(ins)
		})
})

hasWeb3
	.pipe(filter(x => x))
	.subscribe(() => web3.next(new Web3(window.web3.currentProvider)))
