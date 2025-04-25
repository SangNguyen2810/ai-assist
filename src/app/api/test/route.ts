import { NextResponse } from "next/server";
import { testVertexConnection } from "@/lib/ai/vertex";
import { AI_ERRORS, HTTP_STATUS } from "@/constants/errors";

// Define response types for better type safety
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

/**
 * Creates a successful API response
 * @param data The data to include in the response
 * @param message Custom success message
 */
function createSuccessResponse<T>(data: T, message = "Operation successful"): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data
  });
}

/**
 * Creates an error API response
 * @param message Error message
 * @param status HTTP status code
 */
function createErrorResponse(message: string, status = HTTP_STATUS.SERVER_ERROR): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    { 
      success: false, 
      message
    },
    { status }
  );
}

/**
 * API endpoint that tests the connection to Vertex AI
 * GET /api/test
 */
export async function GET() {
  try {
    // Test connection to Vertex AI
    const result = await testVertexConnection();
    
    if (result.success) {
      // Extract model info for the response
      const { model, message } = result;
      return createSuccessResponse({ model }, message);
    } else {
      // Connection test failed but no exception was thrown
      return createErrorResponse(result.message);
    }
  } catch (error) {
    // Unexpected error during test
    console.error("Error testing Vertex AI connection:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : AI_ERRORS.UNKNOWN_ERROR;
    
    return createErrorResponse(`${AI_ERRORS.CHECK_FAILED}: ${errorMessage}`);
  }
} 