import { TemplateResult, html } from 'lit-html'
import { style } from '../../lib/style'
import { asDeclaration, asVar } from '../../lib/style-properties'

const rootStyle = style`
	:root {
		${asDeclaration()}
	}
	@media (prefers-color-scheme: dark) {
		:root {
			${asDeclaration('dark')}
		}
	}
	body {
		margin: 0;
		background: ${asVar('baseColor')}
		font-size: ${asVar('fontSize')}
		font-family: ${asVar('fontFamily')}
		color: ${asVar('fontColor')}
	}
	`

export const head = (): TemplateResult => html`
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Document</title>
	<link
		href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
		rel="stylesheet"
	/>
	${rootStyle}
`
