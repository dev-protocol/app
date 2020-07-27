import { DirectiveFunction, component } from 'ullr/directive'
import { html, TemplateResult } from 'lit-html'
import { style } from '../../lib/style'
import { heading, exLarge } from '../../lib/style-presets'
import { ViewTemplate } from '../../d/app'
import { repeat } from 'lit-html/directives/repeat'
import { format } from 'date-fns'
import { asVar } from '../../lib/style-properties'

interface Milestone {
	date: Date | string
	title: TemplateResult | string
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
				We released the first MVP in Summer 2018. That is the market using npm
				downloads as an valuation method, 1500+ OSSs have been registered and
				achievement more than 8.4 billion downloads per month.
			</p>
		`,
	},
	{
		date: month(2019, 9),
		title: 'Publish the new scheme',
		description: () => html`
			<p>
				We released the new scheme and its whitepaper.
			</p>
		`,
	},
	{
		date: month(2020, 1),
		title: 'First prototype',
		description: () => html`
			<p>
				Deploy to mainnet and publish the npm market for OSS registored by MVP.
				And release the prototype.
			</p>
		`,
	},
	{
		date: month(2020, 4),
		title: 'Stakes.social',
		description: () => html`
			<p>
				Build a generic UI that can smoothly perform staking using Dev Protocol.
			</p>
		`,
	},
	{
		date: month(2020, 6),
		title: 'Khaos and GitHub Market',
		description: () => html`
			<p>We'll build an oracle solution named Khaos.</p>
			<p>
				Also, we'll be building a new Market to tokenize GitHub using Khaos. The
				Market makes value your contribution on GitHub.
			</p>
			<p>
				We'll also be adding asset authentication by GUI as Stakes.social v2.
			</p>
		`,
	},
	{
		date: 'Summer 2020',
		title: 'Dev Kit',
		description: () => html`
			<p>
				Release of a stable version of the JavaScript(TypeScript) SDK that makes
				it easy to build Dev Protocol web applications.
			</p>
		`,
	},
	{
		date: 'Autumn 2020',
		title: 'Private ICO and Upvote',
		description: () =>
			html`
				<p>We're planning a private ICO to build a further ecosystem.</p>
				<p>
					At the same time, we'll build a Dev Protocol version of the Like
					button, named Upvote. Upvote will help develop a market for an
					activity for which there is no clear indicator.
				</p>
			`,
	},
	{
		date: 'Winter 2020',
		title: 'Stakes.social v3',
		description: () =>
			html`<p>
				As Stakes.social v3, we plan to add a GUI that allows you to edit
				Property and Assets combinations freely.
			</p>`,
	},
	{
		date: 'Spring 2021',
		title: 'Dash',
		description: () => html` <p>
				We'll be building an app called "Dash" that stakes out the best
				properties in just one transaction.
			</p>

			<p>
				Dash works like an automated fund, helping users who can't choose where
				to stake.
			</p>`,
	},
	{
		date: 'Summer 2021',
		title: 'Documentation',
		description: () => html`
			<p>We'll release full documentation for developers.</p>
			<p>
				Dev Protocol believes that collaboration with developers is essential.
			</p>
		`,
	},
	{
		date: 'Autumn 2021',
		title: 'Stakes.social v4',
		description: () =>
			html`<p>
				As Stakes.social v4, we plan to release enhanced collaboration with
				third party application layers and asset management capabilities for
				third party operators.
			</p>`,
	},
	{
		date: 'Winter 2021',
		title: 'First IEO',
		description: () =>
			html`<p>
				To makes liquidity in the global market and accelerate the growth of the
				ecosystem, we will be conducting our first IEO.
			</p>`,
	},
	{
		date: 'Spring 2022',
		title: 'Khaos v2',
		description: () => html`<p>
				Make Khaos open and available for protocols other than Dev Protocol.
			</p>

			<p>Anyone can use Khaos by staking the DEV on Dev Protocol.</p>`,
	},
	{
		date: 'Autumn 2022',
		title: 'Major Update and Servant',
		description: () =>
			html`<p>
					Migrate ownership of Dev Protocol to a fully distributed model. At the
					same time, we'll be planing a reduction in Gas fees.
				</p>
				<p>
					We'll also release a project called Servant, which will allow you to
					pay for Gas fees with your DEV.
				</p>`,
	},
	{
		date: '202X',
		title: 'Integration with the World',
		description: () =>
			html`<p>
				Dev Protocol builds an ecosystem with other protocols and platforms that
				support creators.
			</p>`,
	},
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
				${exLarge(`
					grid-template-areas: 'date title description';
					grid-template-columns: 90px 0.5fr 1fr;
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
						<time
							datetime="${typeof date === 'object'
								? format(date, 'yyyy-MM-dd')
								: date}"
							>${typeof date === 'object'
								? format(date, 'MM.yyyy')
								: date}</time
						>
						<h3>${title}</h3>
						<div>${description()}</div>
					</li>
					${injectAfter === undefined ? '' : injectAfter()}
				`
			)}
		</ol>
	`)
