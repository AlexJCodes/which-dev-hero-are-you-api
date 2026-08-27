type ProgressBarOptions = {
	currentIndex: number
	total: number
}

export function createProgressBar(options: ProgressBarOptions): HTMLElement {
	const progress = document.createElement("div")
	progress.className = "quiz-progress"

	const progressPercentage = Math.round(
		((options.currentIndex + 1) / options.total) * 100,
	)

	progress.innerHTML = `
		<div class="quiz-progress__top">
			<p class="quiz-progress__count">
				<span>${options.currentIndex + 1}</span> / ${options.total}
			</p>
			<p class="quiz-progress__percentage">${progressPercentage}% done</p>
		</div>

		<div class="quiz-progress__track">
			<div class="quiz-progress__bar" style="width: ${progressPercentage}%"></div>
		</div>
	`

	return progress
}