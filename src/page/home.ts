import { TemplateResult, html } from 'lit-html'
import { container } from '../component/presentation/container'
import { selectMarket } from '../component/context/select-market'
import { hero } from '../component/for-lp/hero'

export const home = (): TemplateResult => html`
	${hero()}
	${container(
		() =>
			html`
				${selectMarket()}
			`
	)}
`
