export function createErrorResponse(message: string) {
	return {
		success: false,
		message,
	}
}
