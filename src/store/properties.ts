import { BehaviorSubject } from 'rxjs'

export interface Item {
	address: string
	name: string
	authorName: string
}
export type Items = Item[]
const npmProperties = {
	mainnet: [],
	ropsten: [
		{
			address: '0x86786368362465Bc381185cc26EC8d543e691aBC',
			name: '@mediba/stylelint-config',
			authorName: 'uknmr'
		},
		{
			address: '0x6556fED9D0fa08DB756A197934B40B1f6F4a83eD',
			name: 'npm-hello-world-by-narita',
			authorName: 'narita1980'
		},
		{
			address: '0x0000000000000000000000000000000000000000',
			name: 'frontmatter-markdown-loader',
			authorName: 'hmsk'
		},
		{
			address: '0x0000000000000000000000000000000000000000',
			name: 'jest-matcher-vue-test-utils',
			authorName: 'hmsk'
		},
		{
			address: '0x35E009cf5F6E92e351b87D57c450a9E31E503CF1',
			name: 'vue-i18n',
			authorName: 'kazupon'
		},
		{
			address: '0x91B5278208309BfE22Ac8d978d38c38EFE1c47F6',
			name: 'vue-i18n-extensions',
			authorName: 'kazupon'
		},
		{
			address: '0x71904cb499F209Ae5A224AC34608d15aFEdB747f',
			name: '@kazupon/vue-i18n-loader',
			authorName: 'kazupon'
		},
		{
			address: '0xB3FfB4588c32705f9e6EFa35EFD07D61fD840850',
			name: 'vue-cli-plugin-i18n',
			authorName: 'kazupon'
		},
		{
			address: '0xdA6b0B7b4ee41D81ede887f1E84c89F8AD042F8d',
			name: '@lacolaco/reactive-store',
			authorName: 'lacolaco'
		},
		{
			address: '0x0000000000000000000000000000000000000000',
			name: 'dtsgenerator',
			authorName: 'horiuchi'
		},
		{
			address: '0xDcC3459bCbCf0b8B5f3A9c6A9f271795F6926CC4',
			name: 'gulp-riot',
			authorName: 'jigsaw'
		}
	]
}
export interface DevProperty {
	address: string
	name: string
	authorName: string
}

export interface DevProperties {
	[key: string]: DevProperty[]
}

export const properties = new BehaviorSubject<DevProperties>(npmProperties)
