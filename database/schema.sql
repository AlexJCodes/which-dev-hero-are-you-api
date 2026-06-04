-- Database Schema
-- SQL database structure for the API
--
-- TABLES:
-- characters
-- questions
-- answer_options
-- submissions
---------------------------------------------------------------------------------------------

CREATE TABLE characters (
	id VARCHAR(50) PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	developer_type VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	strengths JSON NOT NULL,
	weaknesses JSON NOT NULL,
	catchphrase VARCHAR(255),
	image_url VARCHAR(255)
);

CREATE TABLE questions (
    id VARCHAR(50) PRIMARY KEY,
    text TEXT NOT NULL,
    sort_order INT NOT NULL
);

CREATE TABLE answer_options (
    id VARCHAR(50) PRIMARY KEY,
    question_id VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    character_id VARCHAR(50) NOT NULL,

    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE submissions (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    answers JSON NOT NULL,
    result_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (result_id) REFERENCES characters(id)
);

CREATE TABLE character_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (character_id) REFERENCES characters(id)
);

