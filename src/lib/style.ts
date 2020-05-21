import { process, directive } from 'lit-style'
import { until } from 'lit-html/directives/until'
import { html } from 'lit-html'
import nesting from 'postcss-nesting'

export const processor = process({
	plugins: [nesting()],
})

export const style = directive(
	processor,
	(css) =>
		html`
			<style>
				${until(css)}
			</style>
		`
)
