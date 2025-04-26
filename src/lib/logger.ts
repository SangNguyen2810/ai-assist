import { ChatLogEntry, supabase } from './supabase-client';

export async function logChatMessage(message: ChatLogEntry): Promise<void> {
  try {
    const { error } = await supabase
      .from('chat_logs')
      .insert({
        user_input: message.user_input,
        ai_response: message.ai_response,
        timestamp: new Date().toISOString(),
      });
    
    if (error) {
      console.error('Failed to log message to Supabase:', error);
    }
  } catch (err) {
    console.error('Error logging to Supabase:', err);
  }
} 