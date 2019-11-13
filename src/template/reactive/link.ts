import { TemplateResult } from 'lit-html'
import { route } from '../../store/route'
import { Props, a } from '../pure/a'

const handler = (url: string) => (e: Event) => {
	e.preventDefault()
	route.next(url)
}

export const link = ({ href, content }: Props): TemplateResult =>
	href.startsWith('//')
		? a({ href, content })
		: a({ href, content, onClick: handler(href) })
