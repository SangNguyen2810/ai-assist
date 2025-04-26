import React, { ChangeEvent, FormEvent } from 'react';

interface MessageFormProps {
	input: string;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
	isConnectionValid?: boolean | null;
}

const MessageForm: React.FC<MessageFormProps> = ({
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	isConnectionValid
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 border-t w-full flex space-x-2 shrink-0"
		>
			<input
				type="text"
				value={input}
				onChange={handleInputChange}
				placeholder="Type your message..."
				className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				disabled={isLoading || isConnectionValid === false}
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
				disabled={isLoading || !input.trim() || isConnectionValid === false}
			>
				Send
			</button>
		</form>
	);
};

export default MessageForm;
