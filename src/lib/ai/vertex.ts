import { createVertex } from "@ai-sdk/google-vertex";
import { streamText } from "ai";
import { ApiError } from "../api/error-handler";
import { MODEL_ID } from "@/constants/model";
import { AI_ERRORS, AI_SUCCESS, HTTP_STATUS } from "@/constants/errors";

const loadVertexConfig = () => {
	try {
		const base64 = process.env.GCP_CREDENTIALS_BASE64;
		if (!base64) throw new Error("Missing GCP_CREDENTIALS_BASE64 env var");
		const decoded = Buffer.from(base64, "base64").toString("utf8");
		return JSON.parse(decoded);
	} catch (error) {
		console.error("Failed to load Vertex AI credentials:", error);
		throw new ApiError(AI_ERRORS.CONFIG_LOAD_FAILED, HTTP_STATUS.SERVER_ERROR);
	}
};

const getVertexClient = () => {
	const keyContents = loadVertexConfig();

	return createVertex({
		project: keyContents.project_id,
		location: "us-central1",
		googleAuthOptions: {
			credentials: keyContents,
		},
	});
};

export const getVertexModel = () => {
	try {
		const vertex = getVertexClient();
		return vertex(MODEL_ID);
	} catch (error) {
		if (error instanceof ApiError) throw error;
		throw new ApiError(AI_ERRORS.SERVICE_UNAVAILABLE, HTTP_STATUS.SERVER_ERROR);
	}
};

export const testVertexConnection = async (): Promise<{
	success: boolean;
	message: string;
	model?: string;
}> => {
	try {
		const vertex = getVertexClient();
		const controller = new AbortController();

		setTimeout(() => controller.abort(), 2000);

		try {
			const { textStream } = await streamText({
				model: vertex(MODEL_ID),
				prompt: "Hi",
				abortSignal: controller.signal,
			});

			for await (const delta of textStream) {
				return {
					success: true,
					message: AI_SUCCESS.CONNECTED,
					model: MODEL_ID,
				};
			}

			return {
				success: true,
				message: AI_SUCCESS.CONNECTED_NO_RESPONSE,
				model: MODEL_ID,
			};
		} catch (err) {
			return {
				success: false,
				message: `${AI_ERRORS.STREAMING_FAILED}: ${
					err instanceof Error ? err.message : String(err)
				}`,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: `${AI_ERRORS.CONNECTION_FAILED}: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};
