import { DirectiveFunction, component, subscribe } from '@aggre/ullr/directive'
import { html, TemplateResult } from 'lit-html'
import { style } from '../../lib/style'
import { heading } from '../../lib/style-presets'
import { BehaviorSubject } from 'rxjs'
import { buttonRounded } from '../presentation/button-rounded'
import { button } from '../pure/button'
import { promisify } from '../../lib/promisify'
import { web3 } from '../../store/web3'
import { devMigrationAbi } from '../../abi/dev-migration-abi'
import { txPromisify } from '../../lib/ethereum'

type Store = BehaviorSubject<TemplateResult | undefined>

const handler = (store: Store) => async () => {
	const libWeb3 = await promisify(web3)
	const client = new libWeb3.eth.Contract(
		devMigrationAbi,
		process.env.ADDRESSES_DEV_MIGRATION
	)
	const from = window.ethereum.selectedAddress

	const upgraded = await txPromisify(
		client.methods.migrate().send({ from }),
		() =>
			store.next(
				html`
					...
				`
			)
	).catch((err: Error) => err)
	console.log(upgraded)

	store.next(
		html`
			done
		`
	)
}

const createStore = (): Store => {
	const store = new BehaviorSubject<TemplateResult | undefined>(undefined)
	return store
}

export const updagradeDev = (): DirectiveFunction =>
	(store =>
		component(html`
			${style`
				:host {
					text-align: center;
				}
				${heading()}
			`}
			<h2>Upgrade DEV</h2>
			<p>
				If you have old (published before Jan. 2020) DEV tokens, you can upgrade
				to the new DEV tokens.
			</p>
			${buttonRounded(() =>
				button({ content: 'Upgrade', onClick: handler(store) })
			)('primary')}
			${subscribe(
				store,
				x =>
					html`
						${x}
					`
			)}
		`))(createStore())
