"use client";

import { FormEvent, ChangeEvent } from "react";
import { Message } from "ai";
import ChatMessages from "../ChatMessages";
import MessageForm from "@/components/ContentDisplay/MessageForm";

interface ChatProps {
	messages: Message[];
	input: string;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
	isConnectionValid?: boolean | null;
}

export function Chat({
	messages,
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	isConnectionValid,
}: ChatProps) {
	return (
		<section className="flex flex-col relative grow border rounded-lg overflow-hidden">
			<ChatMessages
				messages={messages}
				isLoading={isLoading}
				isConnectionValid={isConnectionValid}
			/>

			<MessageForm
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
				isConnectionValid={isConnectionValid}
			/>
		</section>
	);
}
