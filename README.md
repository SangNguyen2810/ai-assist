# AI Assistant with Supabase Logging

A modern AI chat assistant powered by Google Vertex AI with automatic conversation logging to Supabase.

## Features

- **Real-time AI Chat**: Communicates with Google Vertex AI for natural language responses
- **Streaming Responses**: Renders AI responses in real-time as they are generated
- **Automatic Chat Logging**: Stores all conversations in Supabase for future reference
- **Optimized Performance**: Background logging doesn't impact the user experience
- **Modern UI**: Clean, responsive interface built with Next.js and React
- **Error Handling**: Graceful handling of connection issues and errors

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **AI Integration**: Google Vertex AI via @ai-sdk
- **Database**: Supabase for conversation logging
- **Styling**: TailwindCSS for UI components
- **TypeScript**: For type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Google Cloud account with Vertex AI API access
- A Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-assistant.git
   cd ai-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Google Vertex AI
   GOOGLE_API_KEY=your_google_api_key
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Supabase Setup

Create a `chat_logs` table in your Supabase project with the following SQL:

```sql
CREATE TABLE chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_input TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX chat_logs_timestamp_idx ON chat_logs (timestamp);

-- Set up Row Level Security (recommended for production)
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Add a policy that allows insert only
CREATE POLICY "Allow inserts" ON chat_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── chat/     # AI chat endpoint
│   │   ├── components/       # React components
│   │   ├── ContentDisplay/       # Main chat display
│   │   ├── MessageStatus/        # Connection status indicators
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   │   ├── useChatLogger.ts      # Chat logging hook
│   ├── lib/              # Utility functions
│   │   ├── ai/           # AI model setup
│   │   ├── logger.ts     # Server-side logging
│   │   ├── supabase-client.ts    # Supabase client
│   ├── types/            # TypeScript type definitions
```

## Implementation Details

### AI Chat Processing

The application uses the `@ai-sdk/google-vertex` package to communicate with Google Vertex AI. The chat is implemented with:

- **Client Side**: Uses the `useChat` hook from `ai` SDK to manage conversation state
- **Server Side**: API routes in `src/app/api/chat/route.ts` handle the communication with the AI model

### Chat Logging System

The application implements background logging of conversations:

- **Client-side Logging**: Uses a custom `useChatLogger` hook that tracks completed message pairs and logs them
- **Supabase Integration**: Direct integration with Supabase for storing conversations
- **Non-blocking**: Logging happens in the background without impacting the user experience
- **Efficient Batching**: Implements message batching to optimize database operations:
  - Collects messages in a queue until a configurable batch size is reached
  - Automatically flushes messages based on a configurable time interval
  - Preserves unsent messages during errors for retry
  - Ensures pending messages are sent before page unload

### Error Handling

The application handles various error scenarios gracefully:

- Connection issues with the AI service
- Database logging failures
- Invalid user inputs

## Deployment

This application can be deployed to any platform that supports Next.js applications:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the application for production:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Google Vertex AI](https://cloud.google.com/vertex-ai) - The AI model provider
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - Tools for building AI-powered user interfaces
