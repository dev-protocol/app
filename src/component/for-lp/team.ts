import { DirectiveFunction, component } from 'ullr/directive'
import { html } from 'lit-html'
import { style } from '../../lib/style'
import { repeat } from 'lit-html/directives/repeat'
import { a } from '../pure/a'
import { exLarge } from '../../lib/style-presets'

interface Item {
	name: string
	image: string
}
type Items = Item[]
interface Member extends Item {
	job: string
	description: string
	linkedin?: string
}
interface Partner extends Item {
	link: string
}

const teamItems: Member[] = [
	{
		name: 'Mayumi Hara',
		image: '/image/team/mayumi.png',
		job: 'CEO',
		linkedin: '//www.linkedin.com/in/hara-mayumi-58799b37',
		description: `Mayumi is a serial entrepreneur, building businesses and developing brands for 10 years in various industries since she started a social marketing startup in 2011. In 2014, she found that traditional artisans dealing with national treasures were undervalued, which led to her starting FRAME00.`,
	},
	{
		name: 'Aggre',
		image: '/image/team/aggre.png',
		job: 'CTO',
		linkedin: '//www.linkedin.com/in/aggre',
		description: `Aggre is a programmer who is committed to open internet technology, constantly updating his  compatibility with the latest tech stacks and solving everyday challenges with technical ideas. He runs several OSS communities and is sponsored by Google. `,
	},
	{
		name: 'Mariko Miyamoto',
		image: '/image/team/mariko.png',
		job: 'COO',
		linkedin: '//www.linkedin.com/in/麻利子-宮本-96a907112/',
		description: `Mariko is a project manager with a wealth of knowledge and experience in the financial industry for almost 20 years, leading implementation of a wide variety of financial systems for the largest securities, megabanks and regional banks in japan.`,
	},
	{
		name: 'Akira Taniguchi',
		image: '/image/team/akira.png',
		job: 'Lead Developer',
		linkedin: '//www.linkedin.com/in/akirataniguchi1',
		description: `Akira is an enthusiastic blockchain developer, having deep experiences on a major crypto exchange in Japan. He has diverse knowledge with ethereum, recommendation engines and big data analysis and is also an OSS committer. `,
	},
	{
		name: 'Masako Arita',
		image: '/image/team/masako.png',
		job: 'General Manager',
		description: `Masako helps the team improve their productivity. She has experience working in government and trade companies and worked with diverse people from all over the world. She always makes sure the team is focused on their work.`,
	},
]
const mentorItems: Member[] = [
	{
		name: 'Yo Nakagawa',
		image: '/image/team/yo.png',
		job: 'Director, Monex Ventures, Inc.',
		description: `Yo is responsible for investing in the blockchain and crypto space for Monex Group, Inc., the parent company of Monex Ventures. Furthermore, Yo is an advisor to Coincheck, Japan's leading crypto exchange. Yo has extensive knowledge and experience in both traditional financial markets as well as crypto businesses.`,
	},
	{
		name: 'Shin Iwata',
		image: '/image/team/shin.png',
		job: 'Partner & CEO at MIRAISE',
		description: `Shin is uniquely positioned to support engineer-founders in Japan with his deep technical experience as a former developer as well as his operational experience as CEO of Skype Japan K.K. and as a Partner at Atomico for several years. Shin received his Bachelor's degree from the Keio University in physics. Kauffman Fellow from Class 20.`,
	},
	{
		name: 'Junya Hirano',
		image: '/image/team/junya.png',
		job: 'CEO at HashHub',
		description: `Junya is CEO at HashHub, a blockchain studio based in Tokyo, Japan. Their goal is to connect with Japan and the rest of the world’s diverse communities. They have officially partnership with ConsenSys.`,
	},
	{
		name: 'Tamio Nishizawa',
		image: '/image/team/tamio.png',
		job: 'Director at Open Innovation Network',
		description: `Tamio worked as a venture capitalist for five years in the United States and 18 years in Japan. He is currently working as a program officer on venture investment for the Japan Science and Technology Agency and supports many startups.`,
	},
]
const partnerItems: Partner[] = [
	{
		name: 'MONEX Ventures',
		image: '/image/partner/monex-ventures.png',
		link: 'http://www.monexventures.com',
	},
	{
		name: 'MIRAISE',
		image: '/image/partner/miraise.png',
		link: 'http://miraise.vc',
	},
	{
		name: 'SIOS Technology, Inc.',
		image: '/image/partner/sios.png',
		link: '//sios.jp',
	},
	{
		name: 'HashHub',
		image: '/image/partner/hashhub.png',
		link: '//hashhub.tokyo',
	},
	{
		name: 'Microsoft for Startups',
		image: '/image/partner/ms-for-startups.png',
		link: '//www.microsoft.com/ja-jp/biz/startups/default.aspx',
	},
]

const teamItemWidth = 260

export const team = (): DirectiveFunction =>
	component(html`
		${style`
			ul {
				display: flex;
				flex-wrap: wrap;
				margin: 0;
				padding: 0;
				list-style: none;
				gap: 1rem;
				justify-content: center;
				max-width: calc(${teamItemWidth.toString()}px * 3 + 4rem);
				margin: auto;
				${exLarge(`
					gap: 2rem;
				`)}
			}
			li {
				max-width: ${teamItemWidth.toString()}px;
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
				& span.job {
					display: block;
					color: gray;
				}
			}
			p {
				font-size: 0.8rem;
				text-align: initial;
			}
			img {
				width: 57%;
				height: auto;
				border-radius: 50%;
			}
		`}
		<ul>
			${repeat(
				teamItems,
				({ name, image, job, linkedin, description }) => html`
					<li>
						<figure>
							<img src="${image}" alt="${name}" />
							<figcaption>
								<span
									>${name}${linkedin
										? a({
												href: linkedin,
												target: '_blank',
												content: html`(in)`,
										  })
										: ''}</span
								>
								<span class="job">${job}</span>
							</figcaption>
							<p>${description}</p>
						</figure>
					</li>
				`
			)}
		</ul>
	`)

export const mentors = (): DirectiveFunction =>
	component(html`
		${style`
			ul {
				display: grid;
				margin: 0;
				padding: 0;
				list-style: none;
				grid-gap: 1rem;
				justify-content: center;
				margin: auto;
				${exLarge(`
				grid-gap: 2rem;
					grid-auto-flow: column;
				`)}
			}
			li {
				max-width: ${teamItemWidth.toString()}px;
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
				& span.job {
					display: block;
					color: gray;
				}
			}
			p {
				font-size: 0.8rem;
				text-align: initial;
			}
			img {
				width: 57%;
				height: auto;
				border-radius: 50%;
			}
		`}
		<ul>
			${repeat(
				mentorItems,
				({ name, image, job, linkedin, description }) => html`
					<li>
						<figure>
							<img src="${image}" alt="${name}" />
							<figcaption>
								<span
									>${name}${linkedin
										? a({
												href: linkedin,
												target: '_blank',
												content: html`(in)`,
										  })
										: ''}</span
								>
								<span class="job">${job}</span>
							</figcaption>
							<p>${description}</p>
						</figure>
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
				margin: 2rem 0;
				padding: 0;
				list-style: none;
				grid-gap: 1rem;
				align-items: center;
				justify-content: center;
				grid-template-columns: repeat(auto-fit, minmax(240px, 0.16fr));
				&:first-of-type {
					margin-top: 0;
				}
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
				({ name, image, link: href }) => html`
					<li>
						${a({
							href,
							target: '_blank',
							content: html` <img src="${image}" alt="${name}" /> `,
						})}
					</li>
				`
			)}
		</ul>
	`)
