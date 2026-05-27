import type { Request, Response } from 'express'
import { createErrorResponse } from '../utils/apiResponse'

// ----------------------------------------------------------- //
// ------------------- NOT FOUND HANDLER --------------------- //
// ----------------------------------------------------------- //

// This middleware handles requests to routes that do not exist.
export function notFoundHandler(_req: Request, res: Response) {
	return res.status(404).json(createErrorResponse('Route not found'))
}
