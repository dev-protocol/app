import { customElements } from 'ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { buttonRounded } from '../component/view/button-rounded'
import { connectToWallet } from '../component/reactive/connect-to-wallet'
import Web3 from 'web3'

export const xApp = customElements(
	() => html`
		${style`
			h1 {
				color: red
			}
		`}
		<h1>hello</h1>
		${buttonRounded(() =>
			connectToWallet({ web3: Web3, ethereum: window.ethereum })
		)}
	`
)
