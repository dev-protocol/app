import { customElements } from 'ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { subscribe } from 'ullr/directive'
import { properties } from '../store/properties'
import { repeat } from 'lit-html/directives/repeat'
import { card } from '../component/for-lp/card'
import { asVar } from '../lib/style-properties'
import { Notification, notification } from '../store/notification'
import { currentNetwork } from '../store/current-network'
import { filter } from 'rxjs/operators'
import { connectButton } from '../component/context/connect-button'
import { a } from '../component/pure/a'

currentNetwork.subscribe((x) => {
	const next: Notification | undefined = x
		? x === 'main' || x === 'ropsten'
			? undefined
			: {
					type: 'failed',
					message: `Cannot use in this network: ${String(x)}`,
			  }
		: {
				type: 'failed',
				message: 'Cannot find the Ethereum wallet in your browser.',
		  }
	notification.next(next)
})

export const xTry = customElements(
	() => html`
		${style`
			:host {
				display: grid;
				grid-gap: 1rem;
			}
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
			.etherscan {
				padding: 0.2rem 1rem;
				margin: 0 0.6rem;
				background: ${asVar('surfaceVariantColor')};
				border-radius: 0 0 5px 5px;
				height: 1.6rem;
				& a {
					color: ${asVar('onSurfaceVariantColor')};
					text-decoration: none;
					font-size: 0.8rem;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 100%;
					display: inline-block;
					overflow: hidden;
				}
			}
			.notice-content {
				position: sticky;
				top: 1rem;
				z-index: 1;
			}
			.notice {
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
		${connectButton({ ethereum: window.ethereum })}
		<div class="notice-content">
			${subscribe(notification, (x) =>
				x === undefined
					? html``
					: html` <div class="notice ${x.type}">${x.message}</div> `
			)}
		</div>
		${subscribe(
			properties,
			(items) =>
				html`
					${subscribe(
						currentNetwork.pipe(filter((x) => x !== undefined)),
						(net) =>
							html`
								<div class="cards">
									${repeat(
										items[net!],
										(item) =>
											html`
												<div>
													<div class="card">
														${card(item)}
													</div>
													<div class="etherscan">
														${a({
															href: `//${
																net === 'main' || !net ? '' : `${net}.`
															}etherscan.io/address/${item.address}`,
															content: item.address,
															target: '_blank',
														})}
													</div>
												</div>
											`
									)}
								</div>
							`
					)}
				`
		)}
	`
)
