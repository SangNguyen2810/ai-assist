import { 
  DEFAULT_BATCH_SIZE, 
  DEFAULT_FLUSH_INTERVAL, 
} from '@/constants/supabase-constants';
import { supabase } from './supabase-config';
import { BatchProcessor } from '../batch-processor/';

export interface ChatLogEntry {
  user_input: string;
  ai_response: string;
  timestamp?: string;
}

interface ChatLogQueueItem {
  userInput: string;
  aiResponse: string;
  timestamp: string;
}

const chatLogProcessor = new BatchProcessor<ChatLogQueueItem>(
  async (items) => {
    try {
      const { error } = await supabase
        .from('chat_logs')
        .insert(
          items.map(msg => ({
            user_input: msg.userInput,
            ai_response: msg.aiResponse,
            timestamp: msg.timestamp,
          }))
        );
      
      if (error) {
        console.error('Failed to batch log messages to Supabase:', error);
        return { success: false };
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error batch logging to Supabase:', err);
      return { success: false };
    }
  },
  {
    batchSize: DEFAULT_BATCH_SIZE,
    flushInterval: DEFAULT_FLUSH_INTERVAL,
    debug: process.env.NODE_ENV === 'development'
  }
);

export async function logChatToSupabase(userInput: string, aiResponse: string): Promise<boolean> {
  chatLogProcessor.add({
    userInput,
    aiResponse,
    timestamp: new Date().toISOString(),
  });
  
  return true;
}

export const flushChatLogs = () => chatLogProcessor.flush(); 
