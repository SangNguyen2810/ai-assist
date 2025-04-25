import { ZodError } from "zod";
import { API_ERRORS, HTTP_STATUS } from "@/constants/errors";

export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = HTTP_STATUS.SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

const createErrorResponse = (message: string, details: string, statusCode = HTTP_STATUS.SERVER_ERROR) => {
  return new Response(
    JSON.stringify({
      error: message,
      details,
    }), 
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const handleApiError = (error: unknown, defaultMessage: string): Response => {
  console.error("API error:", error);
  
  if (error instanceof Error) {
    console.error("Error stack:", error.stack);
  }
  
  if (error instanceof ZodError) {
    return createErrorResponse(
      API_ERRORS.VALIDATION_FAILED, 
      error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  if (error instanceof ApiError) {
    return createErrorResponse(
      error.message,
      error.message,
      error.statusCode
    );
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  return createErrorResponse(defaultMessage, errorMessage);
}; 