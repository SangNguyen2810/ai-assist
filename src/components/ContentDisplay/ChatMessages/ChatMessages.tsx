import { Message } from "@ai-sdk/react";
import { UI_ERRORS } from "@/constants/errors";

import ChatBubble from "./ChatBubble";
import ChatMessageLoading from "./ChatMessageLoading";
import React from "react";

type ChatMessagesProps = {
	messages: Message[];
	isLoading: boolean;
	isConnectionValid?: boolean | null;
};

const ChatMessages = ({
	messages,
	isLoading,
	isConnectionValid,
}: ChatMessagesProps) => (
	<article className="flex-1 overflow-y-auto p-4 space-y-2">
		{messages.length === 0 ? (
			<p className="text-center text-gray-500 mt-8">
				{isConnectionValid === false
					? UI_ERRORS.CONNECTION_CHECK_REQUIRED
					: UI_ERRORS.EMPTY_CHAT}
			</p>
		) : (
			messages.map((message) => (
				<ChatBubble key={message.id} message={message} />
			))
		)}
		{isLoading && <ChatMessageLoading />}
	</article>
);

export default React.memo(ChatMessages);
