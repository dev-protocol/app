import { process, directive } from 'lit-style'
import { until } from 'lit-html/directives/until'
import { html } from 'lit-html'
import postcssPresetEnv from 'postcss-preset-env'

const processor = process({
	plugins: [postcssPresetEnv({ stage: 0 })]
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
