import { Message } from 'ai';

/**
 * Re-export the Message type from 'ai' library for easier importing
 */
export type MessageProps = Message;

/**
 * Type for connection status state
 */
export type ConnectionStatus = {
  isChecking: boolean;
  isConnected: boolean | null;
  error: string | null;
  modelInfo?: string;
};

/**
 * Type for the API response from the test endpoint
 */
export type TestResponse = {
  success: boolean;
  message: string;
  data?: {
    model?: string;
  };
}; 


export type StreamingStatus = 'submitted' | 'streaming' | 'ready' | 'error'