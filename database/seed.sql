INSERT INTO characters (
	id,
	name,
	developer_type,
	description,
	strengths,
	weaknesses,
	catchphrase,
	image_url
) VALUES
(
	'tony-stark',
	'The Promptsmith',
	'The Prototype Hero',
	'You turn vague ideas into working prototypes with prompts, tools, and dangerous momentum. Your speed is impressive, but your technical debt keeps a quiet backlog of revenge.',
	JSON_ARRAY('Speed', 'Innovation', 'Prototyping'),
	JSON_ARRAY('Technical debt', 'Overengineering', 'Skipping tests'),
	'I built this over night.',
	'/images/the-promptsmith.webp'
),
(
	'deadpool',
	'Glitch Riot',
	'The Chaotic Debugger',
	'You debug with instinct, console logs, and chaotic confidence. No one understands the path you took, but the bug is gone and the commit somehow passes.',
	JSON_ARRAY('Creativity', 'Debugging under pressure', 'Humor'),
	JSON_ARRAY('Messy commits', 'Chaotic structure', 'Dangerous shortcuts'),
	'It works. I have no further comments.',
	'/images/the-chaotic-debugger.webp'
),
(
	'yoda',
	'Elder Byte',
	'The Wise Refactor Master',
	'You slow things down just enough to make them better. You sense messy architecture early, refactor carefully, and leave the codebase calmer than you found it.',
	JSON_ARRAY('Clean code', 'Patience', 'Refactoring'),
	JSON_ARRAY('Can overthink', 'Moves slowly at first', 'Hates quick hacks'),
	'Refactor you must!',
	'/images/the-wise-refactor-master.webp'
),
(
	'batman',
	'The Night Architect',
	'The Night Shift Architect',
	'You plan in dark mode, document before you build, and keep a backup plan for your backup branch. Nothing enters production without structure.',
	JSON_ARRAY('Planning', 'Architecture', 'Documentation'),
	JSON_ARRAY('Perfectionism', 'Works too late', 'Trust issues with dependencies'),
	'Night-mode activaded.',
	'/images/the-nightshift-architect.webp'
),
(
	'buzz-lightyear',
	'Orbit Junior',
	'The Overconfident Junior',
	'You bring energy, optimism, and just enough chaos to make every sprint exciting. You may not know the full scope, but you are already halfway through the feature.',
	JSON_ARRAY('Energy', 'Curiosity', 'Fast learning'),
	JSON_ARRAY('Skips planning', 'Trusts tutorials too much', 'Deploys with hope'),
	'To deployment and beyond!.',
	'/images/the-overconfident-junior.webp'
),
(
	'darth-vader',
	'The Code Empress',
	'The Ruthless Code Reviewer',
	'You bring order to chaotic codebases. Your standards are high, your patience is limited, and no pull request escapes your inspection.',
	JSON_ARRAY('Discipline', 'Code quality', 'Standards'),
	JSON_ARRAY('Too strict', 'Scary reviews', 'Low tolerance for messy naming'),
	'I find your lack of tests disturbing.',
	'/images/the-ruthless-code-reviewer.webp'
);