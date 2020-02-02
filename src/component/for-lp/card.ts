import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html, svg } from 'lit-html'
import { style } from '../../lib/style'
import { DevProperty } from '../../store/properties'
import { asVar } from '../../lib/style-properties'
import { devKitContract } from '../../store/dev-kit-contract'
import { toNaturalNumber } from '../../lib/to-natural-number'
import { promisify } from '../../lib/promisify'
import { BehaviorSubject } from 'rxjs'
import { notification } from '../../store/notification'
import { one18 } from '../../lib/numbers'
import { txPromisify, getNetwork } from '../../lib/ethereum'
import { web3TryOut } from '../../store/web3-try-out'
import { web3Dev } from '../../store/web3-dev'
import BigNumber from 'bignumber.js'
import { web3 } from '../../store/web3'
import { addresses } from '../../lib/addresses'
import { currentNetwork } from '../../store/current-network'

type Amounts = { total?: BigNumber; account?: BigNumber }
type Store = BehaviorSubject<Amounts | undefined>

const stakingHandler = (address: string, store: Store) => async () => {
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
	updateStore(store, address)
}

const openHandler = (address: string) => async () => {
	console.log('***')
	const [libWeb3, currentNetwork] = await Promise.all([
		promisify(web3),
		getNetwork()
	])
	const from = window.ethereum.selectedAddress!
	const signature = await libWeb3.eth.personal.sign('hello', from, '')
	console.log(signature)

	const res = await fetch(
		`//dev-protocol.azurewebsites.net/api/secret-message?code=JQPiBU6aCI5fYCDEmiUPJaNUfuqjZaPlYykXTlq0eRb6qMQR1iY09A==&property=${address}&network=${currentNetwork.type as string}&signature=${signature}`
	).then(async x => x.text())

	console.log(res)

	notification.next({
		type: 'succeeded',
		message: res
	})
}

const getPropertyValue = async (address: string): Promise<BigNumber> => {
	const dev = await promisify(devKitContract)
	return dev
		.lockup(addresses(currentNetwork.value?.type)?.lokcup)
		.getPropertyValue(address)
		.then(toNaturalNumber)
}

const getValue = async (address: string): Promise<BigNumber> => {
	const dev = await promisify(devKitContract)
	return dev
		.lockup(addresses(currentNetwork.value?.type)?.lokcup)
		.getValue(address, window.ethereum.selectedAddress ?? '')
		.then(toNaturalNumber)
}

const reducer = (prev: Amounts, data: Amounts): Amounts => ({
	...prev,
	...data
})

const createStore = (address: string): Store => {
	const store = new BehaviorSubject<Amounts | undefined>(undefined)
	return updateStore(store, address)
}

const updateStore = (store: Store, address: string): Store => {
	getPropertyValue(address).then(total =>
		store.next(reducer(store.value ?? {}, { total }))
	)
	getValue(address).then(account =>
		store.next(reducer(store.value ?? {}, { account }))
	)
	return store
}

const stakeButton = svg`
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width="100%"
		height="100%"
	>
		<circle fill="${asVar('secondaryColor')}" cx="12" cy="12" r="12" />
		<path stroke="white" stroke-linecap="round" d="M 9 6 L 15 12 L 9 18" />
	</svg>
`

const openButton = svg`
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width="100%"
		height="100%"
	>
		<circle cx="12" cy="12" r="12" fill="#4caf50" />
		<path
			d="M7 6.5H17C17.8284 6.5 18.5 7.17157 18.5 8V15C18.5 15.8284 17.8284 16.5 17 16.5H7C6.17157 16.5 5.5 15.8284 5.5 15V8C5.5 7.17157 6.17157 6.5 7 6.5Z"
			stroke="white"
		/>
		<path d="M18 7L12 13L6 7" stroke="white" stroke-linecap="round" />
	</svg>
`

export const card = ({
	address,
	name,
	authorName
}: DevProperty): DirectiveFunction =>
	(store =>
		subscribe(
			store,
			amounts =>
				html`
					${component(html`
						${style`
							:host {
								& > div {
									display: grid;
									cursor: pointer;
									padding: 1rem;
									font-family: ${asVar('fontFamilyUI')};
									grid-template-columns: 1fr 0.4fr;
								}
							}
							h1, h2, h3, p {
								margin: 0;
								font-weight: 500;
							}
							h1 {
								font-size: 1.1rem;
								text-overflow: ellipsis;
								white-space: nowrap;
								overflow: hidden;
							}
							p {
								font-size: 0.8rem;
							}
							.locked {
								display: grid;
								grid-template-areas:
									'total-title my-title'
									'total-value my-value'
							}
							dt {
								font-size: 0.9rem;
								color: ${asVar('onSurfaceWeakColor')};
								&.total {
									grid-area: total-title;
								}
								&.my {
									grid-area: my-title;
								}
							}
							dd {
								margin: 0;
								&.total {
									grid-area: total-value;
								}
								&.my {
									grid-area: my-value;
								}
							}
							.content {
								display: grid;
								grid-gap: 0.5rem;
							}
							.button {
								display: grid;
								justify-content: center;
								align-content: center;
								& svg {
									width: 30px;
								}
							}
						`}
						<div
							@click=${amounts?.account?.isGreaterThanOrEqualTo(1)
								? openHandler(address)
								: stakingHandler(address, store)}
						>
							<div class="content">
								<h1>${name}</h1>
								<p>by <strong>${authorName}</strong></p>

								<dl class="locked">
									<dt class="total">Total</dt>
									<dd class="total">
										${amounts?.total
											? `${amounts.total.dp(3).toString()} DEV`
											: '...'}
									</dd>
									<dt class="my">Your</dt>
									<dd class="my">
										${amounts?.account
											? `${amounts.account.dp(3).toString()} DEV`
											: '...'}
									</dd>
								</dl>
							</div>
							<div class="button">
								${amounts?.account?.isGreaterThanOrEqualTo(1)
									? html`
											<div>
												${openButton}
												<p>Open</p>
											</div>
									  `
									: html`
											<div>
												${stakeButton}
												<p>Stake</p>
											</div>
									  `}
							</div>
						</div>
					`)}
				`
		))(createStore(address))
