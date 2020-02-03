import { TemplateResult, html } from 'lit-html'
import { style } from '../../lib/style'
import { asDeclaration, asVar } from '../../lib/style-properties'
import { Context } from '../../lib/context-by-routes'

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
		background: ${asVar('baseColor')};
		font-size: ${asVar('fontSize')};
		font-family: ${asVar('fontFamilyBody')};
		color: ${asVar('fontColor')};
	}
	a {
		color: ${asVar('secondaryColor')};
	}
	`

export const head = (context: Context): TemplateResult => html`
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>${context.documentTitle}</title>
	<link
		href="https://fonts.googleapis.com/css?family=Ubuntu|Montserrat:500|Roboto+Mono:500&display=swap"
		rel="stylesheet"
	/>
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta property="og:url" content="//devprtcl.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Dev Protocol" />
	<meta property="og:description" content="A money designed for OSS" />
	<meta property="og:site_name" content="Dev Protocol" />
	<meta property="og:image" content="/Dev-Protocol--portrait.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@devprtcl" />
	${rootStyle}
`
