/**
 * Application Error Constants
 * 
 * This file contains all error messages used throughout the application.
 * Using constants ensures consistency and makes it easier to modify messages.
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// API Error Messages
export const API_ERRORS = {
  DEFAULT: "An unexpected error occurred",
  INVALID_REQUEST: "Invalid request data",
  VALIDATION_FAILED: "Request validation failed",
  SERVER_ERROR: "Server error occurred",
  
  // Authentication errors
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  
  // Service errors
  SERVICE_UNAVAILABLE: "Service is currently unavailable"
} as const;

// AI Service Error Messages
export const AI_ERRORS = {
  // Configuration errors
  CONFIG_LOAD_FAILED: "Failed to load AI configuration",
  CREDENTIALS_MISSING: "AI credentials are missing or invalid",
  
  // Connection errors
  CONNECTION_FAILED: "Failed to connect to Vertex AI",
  CONNECTION_TIMEOUT: "Connection to AI service timed out",
  SERVICE_UNAVAILABLE: "AI service is currently unavailable",
  STREAMING_FAILED: "Streaming connection failed",
  
  // Request errors
  INVALID_REQUEST: "Invalid AI request format",
  REQUEST_FAILED: "AI request failed",
  GENERATION_FAILED: "Failed to generate AI response",
  
  // Response errors
  EMPTY_RESPONSE: "Received empty response from AI service",
  RESPONSE_ERROR: "Error in AI service response",
  
  // UI facing errors
  GENERIC_ERROR: "An error occurred with the AI service",
  CHECK_FAILED: "Failed to check AI connection",
  UNKNOWN_ERROR: "Unknown error occurred while testing AI connection"
} as const;

// AI Service Success Messages
export const AI_SUCCESS = {
  CONNECTED: "Successfully connected to Vertex AI",
  CONNECTED_NO_RESPONSE: "Connected to Vertex AI (no response)",
  CHAT_PROCESSED: "Chat processed successfully"
} as const;

// UI Error Messages
export const UI_ERRORS = {
  // Connection related
  CONNECTION_ERROR: "AI Service Error",
  CONNECTION_UNAVAILABLE: "Unable to connect to AI service",
  RETRY_SUGGESTION: "Please check your internet connection and try again later or contact support if the issue persists.",
  CONNECTION_CHECK_REQUIRED: "Unable to connect to AI service. Please check the error message above.",
  
  // Chat related
  EMPTY_CHAT: "Start a conversation with the AI assistant",
  EMPTY_MESSAGE: "Message cannot be empty",
  MESSAGE_TOO_LONG: "Message is too long",
  
  // Status messages
  CONNECTING: "Connecting to AI service...",
  CHECKING_CONNECTION: "Checking AI service connection...",
  
  // Generic UI errors
  UNKNOWN_ERROR: "An unknown error occurred",
  OPERATION_FAILED: "Operation failed",
  RETRY_OPERATION: "Please try again"
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CONNECTION_ESTABLISHED: "AI Service Connected",
  USING_MODEL: "Using model"
} as const;

// Error Details (for developers)
export const ERROR_DETAILS = {
  CHECK_CONSOLE: "Check console for more details",
  CONTACT_SUPPORT: "Please contact support with this error information"
} as const;
