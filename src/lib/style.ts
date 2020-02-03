import { process, directive } from 'lit-style'
import { until } from 'lit-html/directives/until'
import { html } from 'lit-html'
import cssnanano from 'cssnano'
import postcssNesting from 'postcss-nesting'

export const processor = process({
	plugins: [cssnanano({ preset: 'default' }), postcssNesting()]
})

export const style = directive(
	processor,
	css =>
		html`
			<style>
				${until(css)}
			</style>
		`
)
