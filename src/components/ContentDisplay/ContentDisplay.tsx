import React from 'react';
import { useChat } from '@ai-sdk/react';
import ErrorState from '@/components/ContentDisplay/Error';
import LoadingSpinner from '@/components/ContentDisplay/Loading';
import { ConnectionStatus } from '@/types';
import { Chat } from '@/components/ContentDisplay/Chat/Chat';
import { useChatLogger } from '@/hooks/useChatLogger';

type ContentDisplayProps = {
  connectionStatus: ConnectionStatus;
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ connectionStatus }) => {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    status 
  } = useChat({
    api: "/api/chat",
  });

  useChatLogger(messages, status);

  const isLoading = status === 'submitted' || status === 'streaming';
  
  if (connectionStatus.isChecking) {
    return <LoadingSpinner />;
  }
  
  if (!connectionStatus.isConnected) {
    return <ErrorState />;
  }
  
  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isConnectionValid={connectionStatus.isConnected}
    />
  );
}; 

export default React.memo(ContentDisplay);