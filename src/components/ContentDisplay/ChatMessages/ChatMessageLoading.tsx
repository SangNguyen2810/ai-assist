import React from "react";

const ChatMessageLoading = () => (
  <article className="flex justify-start">
    <section className="max-w-md p-3 rounded-lg bg-gray-200">
      <div className="flex space-x-2 items-center">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
      </div>
    </section>
  </article>
);

export default React.memo(ChatMessageLoading);