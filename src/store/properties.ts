import { BehaviorSubject } from 'rxjs'

export interface Item {
	address: string
	name: string
	authorName: string
}
export type Items = Item[]
const npmProperties = {
	mainnet: [
		{
			address: '0xC4e4382062B7a2595994faE32cC0d572215abEC5',
			name: '@mediba/stylelint-config',
			authorName: 'uknmr'
		},
		{
			address: '0xC87bF5A50997D732352F9Ca30648d98eBF3B22b3',
			name: 'npm-hello-world-by-narita',
			authorName: 'narita1980'
		},
		{
			address: '0x90f625C2D81Cc271270Bd52beA6C53eb8A0F3bD2',
			name: 'frontmatter-markdown-loader',
			authorName: 'hmsk'
		},
		{
			address: '0xFd7619849f2EeF9041adcC6dCC6D8A2d47fEF271',
			name: 'jest-matcher-vue-test-utils',
			authorName: 'hmsk'
		},
		{
			address: '0xcEBD1BF31DF3E3697Ea26e2F94F9E3644C809F46',
			name: 'vue-i18n',
			authorName: 'kazupon'
		},
		{
			address: '0xB26F9b4bA5F64A5d787eCb16894EF6A720FcEb23',
			name: 'vue-i18n-extensions',
			authorName: 'kazupon'
		},
		{
			address: '0x50e310dcd668A49d610d0f8a0a7D42B27e3be010',
			name: '@kazupon/vue-i18n-loader',
			authorName: 'kazupon'
		},
		{
			address: '0x33D36A508e8624409c79C089Dd363fE8cAdea32a',
			name: 'vue-cli-plugin-i18n',
			authorName: 'kazupon'
		},
		{
			address: '0xFcA9b9b3fdC7C809FcF9f6620Bb39D19abC8BA8f',
			name: '@lacolaco/reactive-store',
			authorName: 'lacolaco'
		},
		{
			address: '0x68c824db5A1634940BB838468Ff2aee2bDa5794B',
			name: 'dtsgenerator',
			authorName: 'horiuchi'
		},
		{
			address: '0x9dcAa594E1e81c9BD005bC6FdEB9E1fc085C7cf6',
			name: 'gulp-riot',
			authorName: 'jigsaw'
		}
	],
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
