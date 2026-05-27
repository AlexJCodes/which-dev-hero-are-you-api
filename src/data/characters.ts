import type { Character } from '../types/quiz.types'

export const characters: Character[] = [
	{
		id: 'tony-stark',
		name: 'Tony Stark',
		developerType: 'The AI-Augmented Engineer',
		description:
			'You build fast, demo hard, and treat AI like your personal junior developer. Your ideas are impressive, but your technical debt is quietly forming a villain origin story.',
		strengths: ['Speed', 'Innovation', 'Prototyping'],
		weaknesses: ['Technical debt', 'Overengineering', 'Skipping tests'],
		catchphrase: 'I built this overnight!',
		imageUrl: '',
	},

	{
		id: 'deadpool',
		name: 'Deadpool',
		developerType: 'The Chaotic Debugger',
		description:
			'You solve problems with console.logs, vibes, and suspicious confidence. Nobody understands your process, but somehow the bug disappears.',
		strengths: ['Creativity', 'Debugging under pressure', 'Humor'],
		weaknesses: ['Messy commits', 'Chaotic structure', 'Dangerous shortcuts'],
		catchphrase: "It works. Don't ask why.",
		imageUrl: '',
	},
	{
		id: 'yoda',
		name: 'Yoda',
		developerType: 'The Wise Refactor Master',
		description:
			'You think before you code, break problems into smaller pieces, and sense bad architecture before it reaches production.',
		strengths: ['Clean code', 'Patience', 'Refactoring'],
		weaknesses: ['Can overthink', 'Moves slowly at first', 'Hates quick hacks'],
		catchphrase: 'Refactor you must.',
		imageUrl: '',
	},
	{
		id: 'batman',
		name: 'Batman',
		developerType: 'The Night Shift Architect',
		description:
			'You live in dark mode, plan before building, and always have a backup branch. Your README is probably better than most apps.',
		strengths: ['Planning', 'Architecture', 'Documentation'],
		weaknesses: ['Perfectionism', 'Works too late', 'Trust issues with dependencies'],
		catchphrase: 'I have a contingency plan.',
		imageUrl: '',
	},
	{
		id: 'buzz-lightyear',
		name: 'Buzz Lightyear',
		developerType: 'The Overconfident Junior',
		description:
			"You bring energy, optimism, and just enough chaos to make every sprint exciting. You may not know the full scope, but you're already halfway into the feature.",
		strengths: ['Energy', 'Curiosity', 'Fast learning'],
		weaknesses: ['Skips planning', 'Trusts tutorials too much', 'Deploys with hope'],
		catchphrase: 'To production and beyond!',
		imageUrl: '',
	},
	{
		id: 'darth-vader',
		name: 'Darth Vader',
		developerType: 'The Ruthless Code Reviewer',
		description:
			'You bring order to chaotic codebases. Your standards are high, your patience is low, and no pull request escapes your inspection.',
		strengths: ['Discipline', 'Code quality', 'Standards'],
		weaknesses: ['Too strict', 'Scary reviews', 'Low tolerance for messy naming'],
		catchphrase: 'This code has failed me for the last time.',
		imageUrl: '',
	},
]
