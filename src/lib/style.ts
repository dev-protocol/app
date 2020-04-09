import { process, directive } from 'lit-style'
import { until } from 'lit-html/directives/until'
import { html } from 'lit-html'
import nesting from 'postcss-nesting'

export const processor = process({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
