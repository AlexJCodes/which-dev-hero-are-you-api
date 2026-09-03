export type StatusMessageVariant = "loading" | "error" | "empty"

type StatusMessageOptions = {
	variant: StatusMessageVariant
	title: string
	message: string
	actionLabel?: string
	onAction?: () => void
}

const variantLabels: Record<StatusMessageVariant, string> = {
	loading: "Loading",
	error: "Something went wrong",
	empty: "Nothing found",
}

export function createStatusMessage(
	options: StatusMessageOptions,
): HTMLElement {
	const wrapper = document.createElement("section")
	wrapper.className = `status-message status-message--${options.variant}`
	wrapper.setAttribute(
		"aria-live",
		options.variant === "loading" ? "polite" : "assertive",
	)

	const badge = document.createElement("p")
	badge.className = "status-message__badge"
	badge.textContent = variantLabels[options.variant]

	const title = document.createElement("h1")
	title.className = "status-message__title"
	title.textContent = options.title

	const message = document.createElement("p")
	message.className = "status-message__text"
	message.textContent = options.message

	wrapper.append(badge, title, message)

	if (options.actionLabel && options.onAction) {
		const actionButton = document.createElement("button")
		actionButton.className = "status-message__button"
		actionButton.type = "button"
		actionButton.textContent = options.actionLabel
		actionButton.addEventListener("click", options.onAction)

		wrapper.append(actionButton)
	}

	return wrapper
}
