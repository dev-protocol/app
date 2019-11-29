export const removeExtraString = (c: string): string =>
	c.replace(/<!--((?!-->)[\w\W])*-->/g, '').trim()
