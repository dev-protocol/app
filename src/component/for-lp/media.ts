import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { repeat } from 'lit-html/directives/repeat'

interface Item {
	key: string
	name: string
	image: string
}
type Items = Item[]

const mediaItems: Items = [
	{
		key: 'tc',
		name: 'Tech Crunch',
		image: '/image/media/tc_logo180x90.png',
	},
	{
		key: 'bridge',
		name: 'Bridge',
		image: '/image/media/The_bridge_logo.svg',
	},
	{
		key: 'nc',
		name: 'あたらしい経済',
		image: '/image/media/neweconomy_logo.svg',
	},
	{
		key: 'nikkei',
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
				grid-gap: 2rem;
				align-items: center;
				justify-content: center;
				justify-items: center;
				grid-template-columns: repeat(auto-fit, minmax(240px, 0.16fr));
			}
			img {
				width: 100%;
				height: 100%;
			}
			li {
				&.tc {
					width: 50%;
				}
				&.nikkei {
					width: 50%;
				}
			}
		`}
		<ul>
			${repeat(
				mediaItems,
				({ key, name, image }) => html`
					<li class=${key}>
						<img src="${image}" alt="${name}" />
					</li>
				`
			)}
		</ul>
	`)
