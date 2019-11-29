import { process, directive } from 'lit-style'
import { until } from 'lit-html/directives/until'
import { html } from 'lit-html'
import postcssPresetEnv from 'postcss-preset-env'
import cssnanano from 'cssnano'

export const processor = process({
	plugins: [postcssPresetEnv({ stage: 0 }), cssnanano({ preset: 'default' })]
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
