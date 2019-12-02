import { TemplateResult } from 'lit-html'
import { route } from '../../store/route'
import { Props, a } from '../pure/a'

const handler = (url: string) => (e: Event) => {
	e.preventDefault()
	route.next(url)
}

export const link = ({ href, content, class: cls }: Props): TemplateResult =>
	href.startsWith('//')
		? a({ href, content, class: cls })
		: a({ href, content, class: cls, onClick: handler(href) })
