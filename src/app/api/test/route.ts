import { NextResponse } from "next/server";
import { testVertexConnection } from "@/lib/ai/vertex";
import { AI_ERRORS, HTTP_STATUS } from "@/constants/errors";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

function createSuccessResponse<T>(data: T, message = "Operation successful"): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data
  });
}

function createErrorResponse(message: string, status = HTTP_STATUS.SERVER_ERROR): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    { 
      success: false, 
      message
    },
    { status }
  );
}
export async function GET() {
  try {
    const result = await testVertexConnection();
    
    if (result.success) {
      const { model, message } = result;
      return createSuccessResponse({ model }, message);
    } else {
      return createErrorResponse(result.message);
    }
  } catch (error) {
    console.error("Error testing Vertex AI connection:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : AI_ERRORS.UNKNOWN_ERROR;
    
    return createErrorResponse(`${AI_ERRORS.CHECK_FAILED}: ${errorMessage}`);
  }
} 