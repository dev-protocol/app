import { customElements } from 'ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'

export const xApp = customElements(
	() => html`
		${style`
			h1 {
				color: red
			}
		`}
		<h1>hello</h1>
	`
)
