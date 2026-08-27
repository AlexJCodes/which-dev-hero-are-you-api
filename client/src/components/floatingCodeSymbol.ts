export type FloatingCodeSymbol = {
	text: string
	modifier: string
}

export function createFloatingCodeSymbol(symbol: FloatingCodeSymbol): HTMLElement {
	const element = document.createElement("span")

	element.className = `landing-symbol landing-symbol--${symbol.modifier}`
	element.textContent = symbol.text

	return element
}