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
import { hasEthereum } from '../store/has-ethereum'
import { txPromisify } from '../lib/ethereum'

type Notification = {
	type: 'info' | 'failed' | 'succeeded'
	message: string
}
const notification = new BehaviorSubject<Notification | undefined>(undefined)

const handler = (address: string) => async () => {
	const [tryOut, dev] = await Promise.all([
		promisify(web3TryOut),
		promisify(web3Dev)
	])
	const from = window.ethereum.selectedAddress

	const approved = await txPromisify(
		dev.methods.approve(tryOut.options.address, one18.toFixed()).send({ from }),
		() =>
			notification.next({
				type: 'info',
				message: 'Staking transactions started...(please wait a minutes)'
			})
	).catch((err: Error) => err)
	if (approved instanceof Error) {
		return notification.next({ type: 'failed', message: approved.message })
	}

	notification.next({
		type: 'info',
		message: `DEVs transfer approval is completed. Then, let's staking! (Please confirm a dialog)`
	})

	const deposited = await txPromisify(
		tryOut.methods.deposit(address, one18.toFixed()).send({ from }),
		() =>
			notification.next({
				type: 'info',
				message: `Now transacting...(please wait a minutes)`
			})
	).catch((err: Error) => err)
	if (deposited instanceof Error) {
		return notification.next({ type: 'failed', message: deposited.message })
	}

	notification.next({
		type: 'succeeded',
		message: `Completed your ${toNaturalNumber(
			one18.toFixed()
		).toString()} DEV staking!`
	})
	properties.next(properties.value)
}

hasEthereum.subscribe(x => {
	const next: Notification | undefined = x
		? undefined
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
				cursor: pointer;
				background: ${asVar('surfaceColor')};
				color:${asVar('onSurfaceColor')};
				padding: 1rem;
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
							items[process.env.ETHEREUM_NETWORK_ID ?? '1'],
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
