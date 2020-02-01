import { customElements } from '@aggre/ullr'
import { html } from 'lit-html'
import { style } from '../lib/style'
import { subscribe } from '@aggre/ullr/directive'
import { properties } from '../store/properties'
import { repeat } from 'lit-html/directives/repeat'
import { card } from '../component/for-lp/card'
import { asVar } from '../lib/style-properties'
import { promisify } from '../lib/promisify'
import { BehaviorSubject } from 'rxjs'
import { toNaturalNumber } from '../lib/to-natural-number'
import { web3TryOut } from '../store/web3-try-out'
import { web3Dev } from '../store/web3-dev'
import { one18 } from '../lib/numbers'

type Notification = {
	type: 'failed' | 'succeeded'
	message: string
}
const notification = new BehaviorSubject<Notification | undefined>(undefined)

const handler = (address: string) => async () => {
	const [tryOut, dev] = await Promise.all([
		promisify(web3TryOut),
		promisify(web3Dev)
	])
	const from = window.ethereum.selectedAddress
	await dev.methods
		.approve(tryOut.options.address, one18.toFixed())
		.send({ from })
	const deposit = await tryOut.methods
		.deposit(address, one18.toFixed())
		.send({ from })
		.catch((err: Error) => err)
	if (deposit instanceof Error) {
		return notification.next({ type: 'failed', message: deposit.message })
	}

	notification.next({
		type: 'succeeded',
		message: `Completed your ${toNaturalNumber(
			one18.toFixed()
		).toString()} DEV staking!`
	})
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
			.notice {
				margin-bottom: 1rem;
				padding: 1rem;
				border-radius: 5px;
				color: white;
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
