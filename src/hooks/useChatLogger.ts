import { useEffect, useRef } from 'react';
import { Message } from 'ai';
import { logChatToSupabase } from '@/lib/supabase-client';

type ChatStatus = 'idle' | 'loading' | 'submitted' | 'streaming' | 'complete' | 'error' | 'ready';

export function useChatLogger(
  messages: Message[],
  status: ChatStatus
) {
  const lastLoggedIndex = useRef(-1);

  useEffect(() => {
    const logCompletedMessages = async () => {
      if (messages.length < 2) {
        return;
      }

      if (lastLoggedIndex.current >= messages.length - 1) {
        return;
      }

      if (status === 'streaming' || status === 'submitted') {
        return;
      }

      for (let i = lastLoggedIndex.current + 1; i < messages.length - 1; i++) {
        const currentMessage = messages[i];
        const nextMessage = messages[i + 1];

        if (currentMessage.role === 'user' && nextMessage.role === 'assistant') {
          const success = await logChatToSupabase(
            currentMessage.content,
            nextMessage.content
          );
          
          if (success) {
            lastLoggedIndex.current = i + 1;
            i++; 
          }
        }
      }
    };

    logCompletedMessages();
  }, [messages, status]); 
} 