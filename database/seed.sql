-- SEED DATA

-------------------------------------------
-- CHARACTERS
-------------------------------------------

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
	'Tony Stark',
	'The AI-Augmented Engineer',
	'You build fast, demo hard, and treat AI like your personal junior developer. Your ideas are impressive, but your technical debt is quietly forming a villain origin story.',
	JSON_ARRAY('Speed', 'Innovation', 'Prototyping'),
	JSON_ARRAY('Technical debt', 'Overengineering', 'Skipping tests'),
	'I built this overnight.',
	'/images/tony-stark.png'
),
(
	'deadpool',
	'Deadpool',
	'The Chaotic Debugger',
	'You solve problems with console.logs, vibes, and suspicious confidence. Nobody understands your process, but somehow the bug disappears.',
	JSON_ARRAY('Creativity', 'Debugging under pressure', 'Humor'),
	JSON_ARRAY('Messy commits', 'Chaotic structure', 'Dangerous shortcuts'),
	'It works. Don''t ask why.',
	'/images/deadpool.png'
),
(
	'yoda',
	'Yoda',
	'The Wise Refactor Master',
	'You think before you code, break problems into smaller pieces, and sense bad architecture before it reaches production.',
	JSON_ARRAY('Clean code', 'Patience', 'Refactoring'),
	JSON_ARRAY('Can overthink', 'Moves slowly at first', 'Hates quick hacks'),
	'Refactor you must.',
	'/images/yoda.png'
),
(
	'batman',
	'Batman',
	'The Night Shift Architect',
	'You live in dark mode, plan before building, and always have a backup branch. Your README is probably better than most apps.',
	JSON_ARRAY('Planning', 'Architecture', 'Documentation'),
	JSON_ARRAY('Perfectionism', 'Works too late', 'Trust issues with dependencies'),
	'I only merge after midnight.',
	'/images/batman.png'
),
(
	'buzz-lightyear',
	'Buzz Lightyear',
	'The Overconfident Junior',
	'You bring energy, optimism, and just enough chaos to make every sprint exciting. You may not know the full scope, but you''re already halfway into the feature.',
	JSON_ARRAY('Energy', 'Curiosity', 'Fast learning'),
	JSON_ARRAY('Skips planning', 'Trusts tutorials too much', 'Deploys with hope'),
	'To production and beyond!',
	'/images/buzz-lightyear.png'
),
(
	'darth-vader',
	'Darth Vader',
	'The Ruthless Code Reviewer',
	'You bring order to chaotic codebases. Your standards are high, your patience is low, and no pull request escapes your inspection.',
	JSON_ARRAY('Discipline', 'Code quality', 'Standards'),
	JSON_ARRAY('Too strict', 'Scary reviews', 'Low tolerance for messy naming'),
	'This code has failed me for the last time.',
	'/images/darth-vader.png'
);

-------------------------------------------
-- QUESTIONS
-------------------------------------------

INSERT INTO questions (
    id,
    text,
    sort_order
) VALUES
(
	'q1',
	'A bug appears 10 minutes before demo. What do you do?',
	1
),
(
	'q2',
	'How do you feel about AI coding tools?',
	2
),
(
	'q3',
	'Your code works, but you don''t know why. What now?',
	3
),
(
	'q4',
	'What is your natural coding environment?',
	4
),
(
	'q5',
	'How do you approach a new feature?',
	5
),
(
	'q6',
	'Your teammate submits messy code. What do you do?',
	6
),
(
	'q7',
	'What scares you the most?',
	7
);

-------------------------------------------
-- ANSWER OPTIONS
-------------------------------------------

INSERT INTO answer_options (
	id,
	question_id,
	text,
	character_id
) VALUES
-- Question 1
(
	'q1-a1',
	'q1',
	'Ask AI, patch fast, and pretend it was planned.',
	'tony-stark'
),
(
	'q1-a2',
	'q1',
	'Add 12 console.logs and follow the chaos.',
	'deadpool'
),
(
	'q1-a3',
	'q1',
	'Pause and understand the root cause first.',
	'yoda'
),
(
	'q1-a4',
	'q1',
	'Activate rollback plan B.',
	'batman'
),
(
	'q1-a5',
	'q1',
	'Deploy anyway. Confidence is key.',
	'buzz-lightyear'
),
(
	'q1-a6',
	'q1',
	'Find the developer responsible.',
	'darth-vader'
),

-- Question 2
(
	'q2-a1',
	'q2',
	'AI is basically my junior developer.',
	'tony-stark'
),
(
	'q2-a2',
	'q2',
	'I use it to generate cursed ideas.',
	'deadpool'
),
(
	'q2-a3',
	'q2',
	'Useful, but verify everything.',
	'yoda'
),
(
	'q2-a4',
	'q2',
	'Only after I understand the architecture.',
	'batman'
),
(
	'q2-a5',
	'q2',
	'It said it works, so I trust it.',
	'buzz-lightyear'
),
(
	'q2-a6',
	'q2',
	'AI-generated code must still pass my review.',
	'darth-vader'
),

-- Question 3
(
	'q3-a1',
	'q3',
	'Turn it into a demo immediately.',
	'tony-stark'
),
(
	'q3-a2',
	'q3',
	'Never touch it again.',
	'deadpool'
),
(
	'q3-a3',
	'q3',
	'Study it until wisdom appears.',
	'yoda'
),
(
	'q3-a4',
	'q3',
	'Document the behavior and add tests.',
	'batman'
),
(
	'q3-a5',
	'q3',
	'Nice. I am a genius.',
	'buzz-lightyear'
),
(
	'q3-a6',
	'q3',
	'Unacceptable. Rewrite it properly.',
	'darth-vader'
),

-- Question 4
(
	'q4-a1',
	'q4',
	'Multiple screens, AI chat, and fast music.',
	'tony-stark'
),
(
	'q4-a2',
	'q4',
	'One messy desktop and 37 tabs.',
	'deadpool'
),
(
	'q4-a3',
	'q4',
	'Quiet room, tea, and clean thoughts.',
	'yoda'
),
(
	'q4-a4',
	'q4',
	'Dark mode cave with perfect structure.',
	'batman'
),
(
	'q4-a5',
	'q4',
	'Anywhere. I just start coding.',
	'buzz-lightyear'
),
(
	'q4-a6',
	'q4',
	'Silent room. No distractions. Only discipline.',
	'darth-vader'
),

-- Question 5
(
	'q5-a1',
	'q5',
	'Build a prototype first.',
	'tony-stark'
),
(
	'q5-a2',
	'q5',
	'Start coding and discover the feature on the way.',
	'deadpool'
),
(
	'q5-a3',
	'q5',
	'Break it into small logical pieces.',
	'yoda'
),
(
	'q5-a4',
	'q5',
	'Plan folders, routes, models, and edge cases.',
	'batman'
),
(
	'q5-a5',
	'q5',
	'Say yes before knowing the scope.',
	'buzz-lightyear'
),
(
	'q5-a6',
	'q5',
	'Define rules, standards, and consequences.',
	'darth-vader'
),

-- Question 6
(
	'q6-a1',
	'q6',
	'Suggest an AI refactor.',
	'tony-stark'
),
(
	'q6-a2',
	'q6',
	'Reply with a meme and fix half of it.',
	'deadpool'
),
(
	'q6-a3',
	'q6',
	'Guide them patiently.',
	'yoda'
),
(
	'q6-a4',
	'q6',
	'Leave a detailed PR review.',
	'batman'
),
(
	'q6-a5',
	'q6',
	'Looks good to me!',
	'buzz-lightyear'
),
(
	'q6-a6',
	'q6',
	'Reject. No mercy.',
	'darth-vader'
),

-- Question 7
(
	'q7-a1',
	'q7',
	'Slow development.',
	'tony-stark'
),
(
	'q7-a2',
	'q7',
	'A project with no chaos.',
	'deadpool'
),
(
	'q7-a3',
	'q7',
	'Unnecessary complexity.',
	'yoda'
),
(
	'q7-a4',
	'q7',
	'No documentation.',
	'batman'
),
(
	'q7-a5',
	'q7',
	'Reading the full error message.',
	'buzz-lightyear'
),
(
	'q7-a6',
	'q7',
	'Weak typing and bad naming.',
	'darth-vader'
);