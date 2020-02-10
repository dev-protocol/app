declare module 'query-selector-shadow-dom' {
	export function querySelectorAllDeep(selector: string, root?: Node): NodeList

	export function querySelectorDeep(
		selector: string,
		root?: Node
	): HTMLElement | null
}
