// Supabase configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Batch processing configuration
export const DEFAULT_BATCH_SIZE = 10;
export const DEFAULT_FLUSH_INTERVAL = 30000; // 30 seconds
export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_DEBUG_MODE = process.env.NODE_ENV === 'development';

// Specific batch settings for different features
export const CHAT_LOG_BATCH_SIZE = 5;
export const CHAT_LOG_FLUSH_INTERVAL = 15000; // 15 seconds 