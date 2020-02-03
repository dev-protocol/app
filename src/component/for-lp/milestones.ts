import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { heading, large } from '../../lib/style-presets'
import { ViewTemplate } from '../../d/app'
import { repeat } from 'lit-html/directives/repeat'
import { format } from 'date-fns'
import { asVar } from '../../lib/style-properties'

interface Milestone {
	date: Date
	title: string
	description: ViewTemplate
	injectAfter?: ViewTemplate
}
type Milestones = Milestone[]

const month = (y: number, m: number): Date => new Date(y, m - 1, 1)

const data: Milestones = [
	{
		date: month(2018, 9),
		title: 'First MVP',
		description: () => html`
			<p>
				We released first MVP at Summer 2018. That is the market using npm
				downloads as an valuation method, 1500+ OSSs have been registered and
				achievement more than 8.4 billion downloads per month.
			</p>
		`
	},
	{
		date: month(2019, 9),
		title: 'Publish the new scheme',
		description: () => html`
			<p>
				We released the new scheme and its whitepaper.
			</p>
		`
	},
	{
		date: month(2020, 1),
		title: 'First prototype',
		description: () => html`
			<p>
				Deploy to mainnet and publish the npm market for OSS registored by MVP.
				And release the prototype.
			</p>
		`
	},
	{
		date: month(2020, 3),
		title: 'Steam market',
		description: () => html`
			<p>
				Planning to do release the new market that gaming platform Steam.
			</p>
		`
	}
]

export const milestones = (): DirectiveFunction =>
	component(html`
		${style`
			${heading()}
			ol {
				list-style: none;
				margin: 0;
				padding: 0;
				display: grid;
				grid-gap: 4rem;
				max-width: 900px;
				margin: 0 auto;
			}
			li {
				display: grid;
				grid-template-areas:
					'date title'
					'description description';
				grid-template-columns: 0.5fr 1fr;
				grid-gap: 1rem;
				${large(`
					grid-template-areas: 'date title description';
					grid-template-columns: 0.2fr 0.5fr 1fr;
				`)}
				& time {
					grid-area: date;
					font-family: ${asVar('fontFamilyHeading')};
				}
				& h3 {
					grid-area: title;
					font-size: 1em;
				}
				& div {
					grid-area: description;
					display: grid;
					font-size: 0.8em;
				}
				& h3,
				& p {
					margin: 0;
				}
			}
		`}
		<ol>
			${repeat(
				data,
				({ date, title, description, injectAfter }) => html`
					<li>
						<time datetime="${format(date, 'yyyy-MM-dd')}"
							>${format(date, 'yyyy.MM')}</time
						>
						<h3>${title}</h3>
						<div>${description()}</div>
					</li>
					${injectAfter === undefined ? '' : injectAfter()}
				`
			)}
		</ol>
	`)
