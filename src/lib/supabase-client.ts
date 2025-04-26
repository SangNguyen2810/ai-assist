import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for chat log entries
export interface ChatLogEntry {
  user_input: string;
  ai_response: string;
  timestamp?: string;
}

/**
 * Logs a chat conversation to Supabase
 * @param userInput - The user's message
 * @param aiResponse - The AI's response
 * @returns Promise resolving to success status
 */
export async function logChatToSupabase(userInput: string, aiResponse: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_logs')
      .insert({
        user_input: userInput,
        ai_response: aiResponse,
        timestamp: new Date().toISOString(),
      });
    
    if (error) {
      console.error('Failed to log message to Supabase:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error logging to Supabase:', err);
    return false;
  }
} 