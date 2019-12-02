import { html, TemplateResult } from 'lit-html'
import { globalNav } from '../presentational/global-nav'
import { connectButton } from './connect-button'
import { container } from '../presentational/container'

interface Props {
	ethereum: Window['ethereum']
}

export const left = (): TemplateResult => html``
export const right = (props: Props): TemplateResult => connectButton(props)

export const globalHeader = (props: Props): TemplateResult =>
	container(() =>
		globalNav(
			() => left(),
			() => right(props)
		)
	)
