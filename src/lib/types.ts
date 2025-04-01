export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface ChatCompletionRequest {
  messages: Message[];
}

export interface ChatCompletionChoice {
  message: Message;
  finish_reason?: string;
  index?: number;
}

export interface ChatCompletionResponse {
  choices: ChatCompletionChoice[];
  error?: {
    message: string;
  };
}

export interface ApiResponse {
  response: Message;
  error?: string;
}
