import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { connectButton } from '../component/context/connect-button'

export const xApp = customElements(
	() => html`
		${style`
			h1 {
				color: red
			}
		`}
		<h1>hello</h1>
		${connectButton({ ethereum: window.ethereum })}
	`
)
