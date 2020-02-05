import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html, TemplateResult } from 'lit-html'
import { style } from '../../lib/style'
import { exLarge } from '../../lib/style-presets'
import { BehaviorSubject } from 'rxjs'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { promisify } from '../../lib/promisify'
import { web3 } from '../../store/web3'
import { devMigrationAbi } from '../../abi/dev-migration-abi'
import { txPromisify, getAccount } from '../../lib/ethereum'
import { asVar } from '../../lib/style-properties'
import { addresses } from '../../lib/addresses'
import { currentNetwork } from '../../store/current-network'
import BigNumber from 'bignumber.js'
import { dev } from '../../abi/dev'
import { toNaturalNumber } from '../../lib/to-natural-number'
import { walletConnected } from '../../store/wallet-connected'
import { filter, take } from 'rxjs/operators'
import { connectButton } from '../context/connect-button'

type Balance = { legacy?: BigNumber; next?: BigNumber }
type BalanceStore = BehaviorSubject<Balance>
type NotificationStore = BehaviorSubject<TemplateResult>

const handler = (
	balanceStore: BalanceStore,
	notificationStore: NotificationStore
) => async () => {
	if (walletConnected.value === false) {
		notificationStore.next(
			html`
				Please connect to your wallet and try again.
			`
		)
		return
	}

	const [from, net] = await Promise.all([
		getAccount(),
		promisify(currentNetwork)
	])

	const approvalAmount = balanceStore.value.legacy
	const libWeb3 = await promisify(web3)
	const devLegacy = new libWeb3.eth.Contract(dev, addresses(net)?.devLegacy)
	const devMigration = new libWeb3.eth.Contract(
		devMigrationAbi,
		addresses(net)?.migration
	)

	const approved = await txPromisify(
		devLegacy.methods
			.approve(addresses(currentNetwork.value)?.migration, approvalAmount)
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
				${approved.message}
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

	if (upgraded instanceof Error) {
		return notificationStore.next(
			html`
				${upgraded.message}
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
			const [from, net] = await Promise.all([
				getAccount(),
				promisify(currentNetwork)
			])
			if (from === undefined) {
				return [undefined, undefined]
			}

			const devLegacy = new libWeb3.eth.Contract(dev, addresses(net)?.devLegacy)
			const devNext = new libWeb3.eth.Contract(dev, addresses(net)?.dev)
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
} => {
	const balance = updateStore(new BehaviorSubject<Balance>({}))
	const notification = new BehaviorSubject<TemplateResult>(html``)
	walletConnected
		.pipe(
			filter(x => x),
			take(1)
		)
		.subscribe(() => updateStore(balance))

	return {
		balance,
		notification
	}
}

export const updagradeDev = (): DirectiveFunction =>
	(({ balance, notification }) =>
		component(html`
			${style`
				:host {
					display: grid;
					grid-gap: 2rem;
					${exLarge(`
						grid-template-columns: repeat(auto-fit,minmax(340px,0.4fr));
					`)}
				}
				.console {
					display: grid;
					grid-gap: 1rem;
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
			`}
			<div>
				<p>
					If you have old DEV tokens, you can upgrade to the new DEV tokens.
				</p>
			</div>
			<div class="console">
				${subscribe(
					walletConnected,
					x =>
						html`
							${x
								? buttonRounded(() =>
										button({
											content: 'Upgrade',
											onClick: handler(balance, notification)
										})
								  )('primary')
								: connectButton({ ethereum: window.ethereum })}
						`
				)}
				${subscribe(notification, x => x)}
				${subscribe(
					currentNetwork,
					network => html`
						<dl>
							<dt class="legacy">Legacy DEV</dt>
							<dd class="legacy">
								<pre>${addresses(network)?.devLegacy}</pre>
								<p>
									You:
									${subscribe(balance, x =>
										x.legacy
											? html`
													${toNaturalNumber(x.legacy)}
											  `
											: html`
													-
											  `
									)}
									DEV
								</p>
							</dd>
							<dt class="new">New DEV</dt>
							<dd class="new">
								<pre>${addresses(network)?.dev}</pre>
								<p>
									You:
									${subscribe(balance, x =>
										x.next
											? html`
													${toNaturalNumber(x.next)}
											  `
											: html`
													-
											  `
									)}
									DEV
								</p>
							</dd>
						</dl>
					`
				)}
			</div>
		`))(createStore())
