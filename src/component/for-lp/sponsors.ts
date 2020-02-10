import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { large } from '../../lib/style-presets'
import { repeat } from 'lit-html/directives/repeat'
import { asVar } from '../../lib/style-properties'
import { a } from '../pure/a'

interface Sponsor {
	name: string
	image: string
	url: string
}
type Sponsors = Sponsor[]

const data: Sponsors = [
	{
		name: 'tecHub',
		image: '/image/techub.jpg',
		url: 'https://twitter.com/techub_jp'
	},
	{
		name: 'theMistletoe',
		image: '/image/themistletoe.png',
		url: 'https://github.com/theMistletoe'
	}
]

export const sponsors = (): DirectiveFunction =>
	component(html`
		${style`
			ul {
				display: grid;
				margin: 0;
				padding: 0;
				list-style: none;
				grid-gap: 2rem;
				grid-template-columns: repeat(auto-fit, 70px);
				${large(`
					grid-template-columns: repeat(auto-fit, 120px);
				`)}
			}
			li {
				text-align: center;
			}
			div {
				height: 70px;
				${large(`
					height: 120px;
				`)}
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 16px;
			}
			a {
				color: ${asVar('fontColor')};
				font-size: 0.8rem;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
				display: inline-block;
				overflow: hidden;
			}
		`}
		<ul>
			${repeat(
				data,
				({ name, image, url }) => html`
					<li>
						${a({
							href: url,
							target: '_blank',
							content: html`
								<div><img src="${image}" alt="${name}" /></div>
								<p>${name}</p>
							`
						})}
					</li>
				`
			)}
		</ul>
	`)
