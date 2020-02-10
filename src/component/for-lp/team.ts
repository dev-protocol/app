import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { repeat } from 'lit-html/directives/repeat'
import { a } from '../pure/a'
import { large } from '../../lib/style-presets'

interface Item {
	name: string
	image: string
	url: string
}
type Items = Item[]

const items: Items = [
	{
		name: 'MIRAISE',
		image: '/image/partner/miraise.png',
		url: '//miraise.vc'
	},
	{
		name: 'HashHub',
		image: '/image/partner/hashhub.png',
		url: '//hashhub.tokyo'
	}
]

export const partners = (): DirectiveFunction =>
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
				grid-template-columns: repeat(2, 0.5fr);
				${large(`
					grid-template-columns: repeat(4, 0.5fr);
				`)}
			}
			img {
				width: 100%;
				height: 100%;
			}
		`}
		<ul>
			${repeat(
				items,
				({ name, image, url }) => html`
					<li>
						${a({
							href: url,
							target: '_blank',
							content: html`
								<img src="${image}" alt="${name}" />
							`
						})}
					</li>
				`
			)}
		</ul>
	`)
