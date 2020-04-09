import { TemplateResult, html } from 'lit-html'
import { globalHeader } from '../component/context/global-header'
import { container } from '../component/presentation/container'
import { selectMarket } from '../component/context/select-market'
const { ethereum } = window

export const list = (): TemplateResult => html`
	${globalHeader({ ethereum })} ${container(() => html` ${selectMarket()} `)}
`
