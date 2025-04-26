import React from "react";
import { Message } from "@ai-sdk/react";

const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <section
        className={`max-w-md p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </section>
    </article>
  );
};

export default React.memo(ChatBubble);