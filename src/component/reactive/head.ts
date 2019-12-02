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
		background: ${asVar('baseColor')}
		font-size: ${asVar('fontSize')}
	}
	`

export const head = (): TemplateResult => html`
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Document</title>
	${rootStyle}
`
