export const removeComments = (c: string): string =>
	c.replace(/<!--((?!-->)[\w\W])*-->/g, '')
