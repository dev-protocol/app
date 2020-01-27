import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { subscribe } from '@aggre/ullr/directive'
import { properties } from '../store/properties'
import { repeat } from 'lit-html/directives/repeat'
import { card } from '../component/for-lp/card'
import { asVar } from '../lib/style-properties'

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
									<div class="card">
										${card(item)}
									</div>
								`
						)}
					</div>
				`
		)}
	`
)
