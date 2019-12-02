export interface Context {
	url: string
	documentTitle: string
}

export const contextByRoutes = (url: string): Context =>
	url === '/'
		? { url, documentTitle: 'Dev Protocol' }
		: { url, documentTitle: 'Page is not found' }
