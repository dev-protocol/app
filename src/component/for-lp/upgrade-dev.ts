import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html, TemplateResult } from 'lit-html'
import { style } from '../../lib/style'
import { heading, exLarge } from '../../lib/style-presets'
import { BehaviorSubject } from 'rxjs'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { promisify } from '../../lib/promisify'
import { web3 } from '../../store/web3'
import { devMigrationAbi } from '../../abi/dev-migration-abi'
import { txPromisify } from '../../lib/ethereum'
import { asVar } from '../../lib/style-properties'
import { addresses } from '../../lib/addresses'
import { currentNetwork } from '../../store/current-network'
import BigNumber from 'bignumber.js'
import { dev } from '../../abi/dev'
import { toNaturalNumber } from '../../lib/to-natural-number'

type Balance = { legacy?: BigNumber; next?: BigNumber }
type BalanceStore = BehaviorSubject<Balance>
type NotificationStore = BehaviorSubject<TemplateResult>

const handler = (
	balanceStore: BalanceStore,
	notificationStore: NotificationStore
) => async () => {
	await promisify(currentNetwork)
	const from = window.ethereum.selectedAddress
	const approvalAmount = balanceStore.value.legacy
	const libWeb3 = await promisify(web3)
	const devLegacy = new libWeb3.eth.Contract(
		dev,
		addresses(currentNetwork.value?.type)?.devLegacy
	)
	const devMigration = new libWeb3.eth.Contract(
		devMigrationAbi,
		addresses(currentNetwork.value?.type)?.migration
	)

	const approved = await txPromisify(
		devLegacy.methods
			.approve(addresses(currentNetwork.value?.type)?.migration, approvalAmount)
			.send({ from }),
		() =>
			notificationStore.next(
				html`
					Upgrade starting...(please wait a minute)
				`
			)
	).catch((err: Error) => err)

	if (approved instanceof Error) {
		return notificationStore.next(
			html`
				Failed to approval.
			`
		)
	}

	notificationStore.next(
		html`
			DEVs transfer approval is completed. Then, let's upgrading!
		`
	)

	const upgraded = await txPromisify(
		devMigration.methods.migrate().send({ from }),
		() =>
			notificationStore.next(
				html`
					Now upgrading...
				`
			)
	).catch((err: Error) => err)
	console.log(upgraded)

	if (upgraded instanceof Error) {
		return notificationStore.next(
			html`
				Failed to upgrade
			`
		)
	}

	notificationStore.next(
		html`
			Upgrade your DEV tokens is done!
		`
	)

	updateStore(balanceStore)
}

const updateStore = (store: BalanceStore): BalanceStore => {
	promisify(currentNetwork)
		.then(async () => promisify(web3))
		.then(async libWeb3 => {
			const from = window.ethereum.selectedAddress
			const devLegacy = new libWeb3.eth.Contract(
				dev,
				addresses(currentNetwork.value?.type)?.devLegacy
			)
			const devNext = new libWeb3.eth.Contract(
				dev,
				addresses(currentNetwork.value?.type)?.dev
			)
			return Promise.all([
				devLegacy.methods.balanceOf(from).call(),
				devNext.methods.balanceOf(from).call()
			])
		})
		.then(([legacy, next]) => store.next({ legacy, next }))
	return store
}

const createStore = (): {
	balance: BalanceStore
	notification: NotificationStore
} => ({
	balance: updateStore(new BehaviorSubject<Balance>({})),
	notification: new BehaviorSubject<TemplateResult>(html``)
})

export const updagradeDev = (): DirectiveFunction =>
	(({ balance, notification }) =>
		component(html`
			${style`
				:host {
					display: grid;
					grid-gap: 2rem;
					justify-items: center;
				}
				p, dl, dd, pre {
					margin: 0;
				}
				dl {
					display: grid;
					font-size: 0.9rem;
					grid-gap: 1rem;
					grid-template-areas:
						'legacy-title'
						'legacy-address'
						'new-title'
						'new-address';
					${exLarge(`
						grid-template-areas:
							'legacy-title new-title'
							'legacy-address new-address';
					`)}
				}
				dt {
					color: ${asVar('weakColor')};
					&.legacy {
						grid-area: legacy-title;
					}
					&.new {
						grid-area: new-title;
					}
				}
				dd {
					word-break: break-all;
					&.legacy {
						grid-area: legacy-address;
					}
					&.new {
						grid-area: new-address;
					}
				}
				${heading()}
			`}
			<h2>Upgrade DEV</h2>
			<p>
				If you have old (published before Jan. 2020) DEV tokens, you can upgrade
				to the new DEV tokens.
			</p>
			${buttonRounded(() =>
				button({ content: 'Upgrade', onClick: handler(balance, notification) })
			)('primary')}
			${subscribe(notification, x => x)}
			${subscribe(
				currentNetwork,
				network => html`
					<dl>
						<dt class="legacy">Legacy DEV</dt>
						<dd class="legacy">
							<pre>${addresses(network?.type)?.devLegacy}</pre>
							<p>
								You:
								${subscribe(
									balance,
									x =>
										html`
											${toNaturalNumber(x.legacy!)}
										`
								)}
								DEV
							</p>
						</dd>
						<dt class="new">New DEV</dt>
						<dd class="new">
							<pre>${addresses(network?.type)?.dev}</pre>
							<p>
								You:
								${subscribe(
									balance,
									x =>
										html`
											${toNaturalNumber(x.next!)}
										`
								)}
								DEV
							</p>
						</dd>
					</dl>
				`
			)}
		`))(createStore())
