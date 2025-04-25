import { streamText } from "ai";
import { getVertexModel } from "@/lib/ai/vertex";
import { ChatRequestValidator } from "@/lib/validators/chat";
import { handleApiError } from "@/lib/api/error-handler";
import { AI_ERRORS } from "@/constants/errors";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const validatedRequest = ChatRequestValidator.parse(body);
		
		const model = getVertexModel();
		const result = await streamText({
			model,
			messages: validatedRequest.messages,
			temperature: 0.7,
			maxTokens: 800,
		});
		
		return result.toDataStreamResponse();
	} catch (error) {
		return handleApiError(error, AI_ERRORS.GENERATION_FAILED);
	}
}
