// ----------------------------------------------------------- //
// ---------------- VALIDATE COMMENT INPUT ------------------- //
// ----------------------------------------------------------- //

const MAX_AUTHOR_LENGTH = 100
const MAX_CONTENT_LENGTH = 500

export function isValidCommentAuthor(author: unknown): author is string {
	return (
		typeof author === 'string' &&
		author.trim().length > 0 &&
		author.trim().length <= MAX_AUTHOR_LENGTH
	)
}

export function isValidCommentContent(content: unknown): content is string {
	return (
		typeof content === 'string' &&
		content.trim().length > 0 &&
		content.trim().length <= MAX_CONTENT_LENGTH
	)
}
