// ----------------------------------------------------------- //
// -------------------- ERROR HANDLER ------------------------ //
// ----------------------------------------------------------- //
import type { NextFunction, Request, Response } from 'express'
import { createErrorResponse } from '../utils/apiResponse'

// This middleware catches errors that happen outside our route

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
	console.error(error)

	// Handle invalid JSON body errors from express.json()
	if (error instanceof SyntaxError) {
		return res.status(400).json(createErrorResponse('Invalid JSON body'))
	}

	// Fallback for unexpected server errors
	return res.status(500).json(createErrorResponse('Internal server error'))
}
