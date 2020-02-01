import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { subscribe } from '@aggre/ullr/directive'
import { properties } from '../store/properties'
import { repeat } from 'lit-html/directives/repeat'
import { card } from '../component/for-lp/card'
import { asVar } from '../lib/style-properties'
import { hasEthereum } from '../store/has-ethereum'
import { Notification, notification } from '../store/notification'
import { getNetwork } from '../lib/ethereum'

hasEthereum.subscribe(async x => {
	const net = await getNetwork()
	const next: Notification | undefined = x
		? net.type === process.env.ETHEREUM_NETWORK_TYPE
			? undefined
			: {
					type: 'failed',
					message: `Cannot use in this network: ${String(net.type)}`
			  }
		: {
				type: 'failed',
				message: 'Cannot find the Ethereum wallet in your browser.'
		  }
	notification.next(next)
})

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
				border-radius: 5px;
			}
			.notice {
				position: sticky;
				top: 1rem;
				margin-bottom: 1rem;
				padding: 1rem;
				border-radius: 5px;
				color: white;
				&.info {
					background: #2196f3;
				}
				&.failed {
					background: #ff5722;
				}
				&.succeeded {
					background: #4caf50;
				}
			}
		`}
		${subscribe(notification, x =>
			x === undefined
				? html``
				: html`
						<div class="notice ${x.type}">${x.message}</div>
				  `
		)}
		${subscribe(
			properties,
			items =>
				html`
					<div class="cards">
						${repeat(
							items[process.env.ETHEREUM_NETWORK_TYPE!],
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
