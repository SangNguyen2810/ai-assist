import { z } from "zod";

export const MessageValidator = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});

export const ChatRequestValidator = z.object({
  messages: z.array(MessageValidator).min(1),
}); 