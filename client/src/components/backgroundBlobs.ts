export function createBackgroundBlobs(): HTMLElement {
	const background = document.createElement("div")

	background.className = "landing-bg"
	background.setAttribute("aria-hidden", "true")

	background.innerHTML = `
		<div class="landing-bg__blob landing-bg__blob--cyan"></div>
		<div class="landing-bg__blob landing-bg__blob--purple"></div>
		<div class="landing-bg__blob landing-bg__blob--pink"></div>
		<div class="landing-bg__grid"></div>
	`

	return background
}