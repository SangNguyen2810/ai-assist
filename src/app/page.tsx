"use client";

import { useState, useEffect } from "react";
import ContentDisplay from "@/components/ContentDisplay";
import MessageStatus from "@/components/MessageStatus";
import { ConnectionStatus, TestResponse } from "@/types";
import { AI_ERRORS } from "@/constants/errors";

export default function Home() {
	const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
		isChecking: true,
		isConnected: null,
		error: null,
	});

	useEffect(() => {
		const checkConnection = async () => {
			try {
				const response = await fetch("/api/test");
				const result = (await response.json()) as TestResponse;

				setConnectionStatus({
					isChecking: false,
					isConnected: result.success,
					error: result.success ? null : result.message,
					modelInfo: result.data?.model || "Unknown",
				});
			} catch (err) {
				console.error("Failed to check AI connection:", err);
				setConnectionStatus({
					isChecking: false,
					isConnected: false,
					error: AI_ERRORS.CHECK_FAILED,
				});
			}
		};

		checkConnection();
	}, []);

	return (
		<main className="flex h-screen max-h-screen overflow-hidden flex-col p-4 w-full">
			<MessageStatus status={connectionStatus} />
			<ContentDisplay connectionStatus={connectionStatus} />
		</main>
	);
}
