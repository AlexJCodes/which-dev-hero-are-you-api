import type { Question } from '../types/quiz.types'

export const questions: Question[] = [
	{
		id: 'q1',
		text: 'A bug appears 10 minutes before demo. What do you do?',
		options: [
			{
				id: 'q1-a1',
				text: 'Ask AI, patch fast, and pretend it was planned.',
				characterId: 'tony-stark',
			},
			{
				id: 'q1-a2',
				text: 'Add 12 console.logs and follow the chaos.',
				characterId: 'deadpool',
			},
			{
				id: 'q1-a3',
				text: 'Pause and understand the root cause first.',
				characterId: 'yoda',
			},
			{
				id: 'q1-a4',
				text: 'Activate rollback plan B.',
				characterId: 'batman',
			},
			{
				id: 'q1-a5',
				text: 'Deploy anyway. Confidence is key.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q1-a6',
				text: 'Find the developer responsible.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q2',
		text: 'How do you feel about AI coding tools?',
		options: [
			{
				id: 'q2-a1',
				text: 'AI is basically my junior developer.',
				characterId: 'tony-stark',
			},
			{
				id: 'q2-a2',
				text: 'I use it to generate cursed ideas.',
				characterId: 'deadpool',
			},
			{
				id: 'q2-a3',
				text: 'Useful, but verify everything.',
				characterId: 'yoda',
			},
			{
				id: 'q2-a4',
				text: 'Only after I understand the architecture.',
				characterId: 'batman',
			},
			{
				id: 'q2-a5',
				text: 'It said it works, so I trust it.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q2-a6',
				text: 'AI-generated code must still pass my review.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q3',
		text: "Your code works, but you don't know why. What now?",
		options: [
			{
				id: 'q3-a1',
				text: 'Turn it into a demo immediately.',
				characterId: 'tony-stark',
			},
			{
				id: 'q3-a2',
				text: 'Never touch it again.',
				characterId: 'deadpool',
			},
			{
				id: 'q3-a3',
				text: 'Study it until wisdom appears.',
				characterId: 'yoda',
			},
			{
				id: 'q3-a4',
				text: 'Document the behavior and add tests.',
				characterId: 'batman',
			},
			{
				id: 'q3-a5',
				text: 'Nice. I am a genius.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q3-a6',
				text: 'Unacceptable. Rewrite it properly.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q4',
		text: 'What is your natural coding environment?',
		options: [
			{
				id: 'q4-a1',
				text: 'Multiple screens, AI chat, and fast music.',
				characterId: 'tony-stark',
			},
			{
				id: 'q4-a2',
				text: 'One messy desktop and 37 tabs.',
				characterId: 'deadpool',
			},
			{
				id: 'q4-a3',
				text: 'Quiet room, tea, and clean thoughts.',
				characterId: 'yoda',
			},
			{
				id: 'q4-a4',
				text: 'Dark mode cave with perfect structure.',
				characterId: 'batman',
			},
			{
				id: 'q4-a5',
				text: 'Anywhere. I just start coding.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q4-a6',
				text: 'Silent room. No distractions. Only discipline.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q5',
		text: 'How do you approach a new feature?',
		options: [
			{
				id: 'q5-a1',
				text: 'Build a prototype first.',
				characterId: 'tony-stark',
			},
			{
				id: 'q5-a2',
				text: 'Start coding and discover the feature on the way.',
				characterId: 'deadpool',
			},
			{
				id: 'q5-a3',
				text: 'Break it into small logical pieces.',
				characterId: 'yoda',
			},
			{
				id: 'q5-a4',
				text: 'Plan folders, routes, models, and edge cases.',
				characterId: 'batman',
			},
			{
				id: 'q5-a5',
				text: 'Say yes before knowing the scope.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q5-a6',
				text: 'Define rules, standards, and consequences.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q6',
		text: 'Your teammate submits messy code. What do you do?',
		options: [
			{
				id: 'q6-a1',
				text: 'Suggest an AI refactor.',
				characterId: 'tony-stark',
			},
			{
				id: 'q6-a2',
				text: 'Reply with a meme and fix half of it.',
				characterId: 'deadpool',
			},
			{
				id: 'q6-a3',
				text: 'Guide them patiently.',
				characterId: 'yoda',
			},
			{
				id: 'q6-a4',
				text: 'Leave a detailed PR review.',
				characterId: 'batman',
			},
			{
				id: 'q6-a5',
				text: 'Looks good to me!',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q6-a6',
				text: 'Reject. No mercy.',
				characterId: 'darth-vader',
			},
		],
	},
	{
		id: 'q7',
		text: 'What scares you the most?',
		options: [
			{
				id: 'q7-a1',
				text: 'Slow development.',
				characterId: 'tony-stark',
			},
			{
				id: 'q7-a2',
				text: 'A project with no chaos.',
				characterId: 'deadpool',
			},
			{
				id: 'q7-a3',
				text: 'Unnecessary complexity.',
				characterId: 'yoda',
			},
			{
				id: 'q7-a4',
				text: 'No documentation.',
				characterId: 'batman',
			},
			{
				id: 'q7-a5',
				text: 'Reading the full error message.',
				characterId: 'buzz-lightyear',
			},
			{
				id: 'q7-a6',
				text: 'Weak typing and bad naming.',
				characterId: 'darth-vader',
			},
		],
	},
]
