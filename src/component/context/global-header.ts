import { html, TemplateResult } from 'lit-html'
import { globalNav } from '../presentation/global-nav'
import { connectButton } from './connect-button'
import { container } from '../presentation/container'
import { DirectiveFunction } from 'ullr/directive'

interface Props {
	ethereum: Window['ethereum']
}

export const left = (): TemplateResult => html``
export const right = (props: Props): TemplateResult =>
	html` ${connectButton(props)} `

export const globalHeader = (props: Props): DirectiveFunction =>
	container(
		() =>
			html`
				${globalNav(
					() => left(),
					() => right(props)
				)}
			`
	)
