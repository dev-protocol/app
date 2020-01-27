import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { subscribe } from '@aggre/ullr/directive'
import { properties } from '../store/properties'
import { repeat } from 'lit-html/directives/repeat'
import { card } from '../component/for-lp/card'
import { asVar } from '../lib/style-properties'
import { promisify } from '../lib/promisify'
import { devKitContract } from '../store/dev-kit-contract'

const handler = (address: string) => async () => {
	const dev = await promisify(devKitContract)
	console.log(address, dev)
}

export const xTry = customElements(
	() => html`
		${style`
			.cards {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
				grid-gap: 1rem;
			}
			.card {
				display: block;
				background: ${asVar('surfaceColor')};
				color:${asVar('onSurfaceColor')};
				padding: 1rem;
				border-radius: 5px;
			}
		`}
		${subscribe(
			properties,
			items =>
				html`
					<div class="cards">
						${repeat(
							items,
							item =>
								html`
									<div class="card" @click=${handler(item.address)}>
										${card(item)}
									</div>
								`
						)}
					</div>
				`
		)}
	`
)
