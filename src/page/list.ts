import { TemplateResult, html } from 'lit-html'
import { globalHeader } from '../component/context/global-header'
const { ethereum } = window

export const list = (): TemplateResult => html`
	${globalHeader({ ethereum })}
`
