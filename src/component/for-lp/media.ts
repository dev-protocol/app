import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { repeat } from 'lit-html/directives/repeat'
import { exLarge } from '../../lib/style-presets'

interface Item {
	name: string
	image: string
}
type Items = Item[]
interface Member extends Item {
	job: string
}

const mediaItems: Items = [
	{
		name: 'Tech Crunch',
		image: '/image/media/tc_logo180x90.png',
	},
	{
		name: 'Bridge',
		image: '/image/media/The_bridge_logo.svg',
	},
	{
		name: 'あたらしい経済',
		image: '/image/media/neweconomy_logo.svg',
	},
	{
		name: '日経産業新聞',
		image: '/image/media/ss02.svg',
	},
]

export const mediaCoverage = (): DirectiveFunction =>
	component(html`
		${style`
			ul {
				display: grid;
				margin: 0;
				padding: 0;
				list-style: none;
				grid-gap: 1rem;
				align-items: center;
				justify-content: center;
				grid-template-columns: repeat(auto-fit, minmax(240px, 0.16fr));
				${exLarge(`
					grid-gap: 2rem;
				`)}
			}
			img {
				width: 100%;
				height: 100%;
			}
		`}
		<ul>
			${repeat(
				mediaItems,
				({ name, image }) => html`
					<li>
						<img src="${image}" alt="${name}" />
					</li>
				`
			)}
		</ul>
	`)
