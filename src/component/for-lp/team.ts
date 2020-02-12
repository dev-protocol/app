import { DirectiveFunction, component } from '@aggre/ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { repeat } from 'lit-html/directives/repeat'
import { a } from '../pure/a'
import { exLarge } from '../../lib/style-presets'

interface Item {
	name: string
	image: string
	url: string
}
type Items = Item[]
interface Member extends Item {
	job: string
}

const teamItems: Member[] = [
	{
		name: 'Mayumi H.',
		image: '/image/team/mayumi.jpg',
		job: 'CEO',
		url: '//www.linkedin.com/in/hara-mayumi-58799b37'
	},
	{
		name: 'aggre',
		image: '/image/team/aggre.jpg',
		job: 'CTO',
		url: '//www.linkedin.com/in/aggre'
	},
	{
		name: 'Mariko M.',
		image: '/image/team/mariko.jpg',
		job: 'COO',
		url: '//www.wantedly.com/users/34890039'
	}
]
const partnerItems: Items = [
	{
		name: 'MIRAISE',
		image: '/image/partner/miraise.png',
		url: 'http://miraise.vc'
	},
	{
		name: 'SIOS Technology, Inc.',
		image: '/image/partner/sios.png',
		url: '//sios.jp'
	},
	{
		name: 'HashHub',
		image: '/image/partner/hashhub.png',
		url: '//hashhub.tokyo'
	},
	{
		name: 'Microsoft for Startups',
		image: '/image/partner/ms-for-startups.png',
		url: '//www.microsoft.com/ja-jp/biz/startups/default.aspx'
	}
]

export const team = (): DirectiveFunction =>
	component(html`
		${style`
			ul {
				display: grid;
				margin: 0;
				padding: 0;
				list-style: none;
				grid-gap: 1rem;
				justify-content: center;
				grid-template-columns: repeat(auto-fit, 100px);
				${exLarge(`
					grid-gap: 2rem;
				`)}
			}
			li {
				text-align: center;
			}
			a {
				color: black;
				text-decoration: none;
			}
			figure {
				margin: 0;
			}
			figcaption {
				font-size: 0.8rem;
				& span {
					color: gray;
				}
			}
			img {
				width: 100%;
				height: auto;
				border-radius: 50%;
			}
		`}
		<ul>
			${repeat(
				teamItems,
				({ name, image, job, url }) => html`
					<li>
						${a({
							href: url,
							target: '_blank',
							content: html`
								<figure>
									<img src="${image}" alt="${name}" />
									<figcaption>${name} <span>${job}</span></figcaption>
								</figure>
							`
						})}
					</li>
				`
			)}
		</ul>
	`)

export const partners = (): DirectiveFunction =>
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
				partnerItems,
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
