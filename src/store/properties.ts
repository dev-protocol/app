import { BehaviorSubject } from 'rxjs'

export interface Item {
	address: string
	name: string
	authorName: string
}
export type Items = Item[]
const npmProperties = [
	{
		address: '0x0',
		name: '@mediba/stylelint-config',
		authorName: 'alice'
	},
	{
		address: '0x0',
		name: 'npm-hello-world-by-narita',
		authorName: 'bob'
	},
	{
		address: '0x0',
		name: 'frontmatter-markdown-loader',
		authorName: 'alice'
	},
	{
		address: '0x0',
		name: 'jest-matcher-vue-test-utils',
		authorName: 'bob'
	},
	{
		address: '0x0',
		name: 'vue-i18n',
		authorName: 'alice'
	},
	{
		address: '0x0',
		name: 'vue-i18n-extensions',
		authorName: 'bob'
	},
	{
		address: '0x0',
		name: '@kazupon/vue-i18n-loader',
		authorName: 'alice'
	},
	{
		address: '0x0',
		name: 'vue-cli-plugin-i18n',
		authorName: 'bob'
	},
	{
		address: '0x0',
		name: '@lacolaco/reactive-store',
		authorName: 'alice'
	},
	{
		address: '0x0',
		name: 'dtsgenerator',
		authorName: 'bob'
	},
	{
		address: '0x0',
		name: 'gulp-riot',
		authorName: 'alice'
	}
]
export interface DevProperty {
	address: string
	name: string
	authorName: string
}

export type DevProperties = DevProperty[]

export const properties = new BehaviorSubject<DevProperties>(npmProperties)
