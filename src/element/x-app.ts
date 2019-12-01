import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { connectButton } from '../component/context/connect-button'
import { subscribe } from '@aggre/ullr/directive'
import { web3, EthereumClass } from '../store/web3'
import { filter } from 'rxjs/operators'

export const xApp = customElements(
	() => html`
		${style`
			h1 {
				color: red
			}
		`}
		<h1>hello</h1>
		${subscribe(web3.pipe(filter(x => typeof x !== 'undefined')), x =>
			connectButton({
				ethereum: window.ethereum,
				lib: (x as unknown) as EthereumClass
			})
		)}
	`
)
