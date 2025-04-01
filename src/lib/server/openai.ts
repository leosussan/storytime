import { OPENAI_API_KEY } from '$env/static/private';
import type { Message } from '$lib/types';

// Extract system prompt to a constant for better maintainability
export const SYSTEM_PROMPT = `You are a 'Choose Your Own Adventure' storyteller. For the first user message, create an engaging story beginning (about 3-4 paragraphs) that ends with numbered choices in this exact format: 1-2 (or more) should be specific story paths, then ALWAYS include these standard options in this exact order: the next number should be 'Continue writing' (to elaborate on the current scene without advancing the plot), the next number should be 'End the story here', and the final number should be 'Write your own path...'. For example, if there are 2 story paths, the options would be: '1. [Story path]', '2. [Story path]', '3. Continue writing', '4. End the story here', '5. Write your own path...'. For subsequent messages, continue the story based on the user's choice. If they choose 'End the story here', provide a satisfying conclusion. If they choose 'Write your own path...', incorporate their custom direction into the story. If they choose 'Continue writing', elaborate on the current scene without advancing to a new plot point. For all other choices, continue the story and always end with the same numbered format: specific story paths first, followed by 'Continue writing', 'End the story here', and 'Write your own path...' as the last options. Keep the story engaging and responsive to user choices. IMPORTANT: As the story progresses, make the narrative gradually more unhinged, bizarre, and unexpected with each response. Start relatively normal but slowly increase the absurdity and unpredictability. The story should NEVER end unless the user explicitly chooses 'End the story here'.`;

/**
 * Checks if the OpenAI API key is available
 */
export function isApiKeyAvailable(): boolean {
  return !!OPENAI_API_KEY;
}

/**
 * Generates a mock response when the API key is not available
 */
export function getMockResponse(): Message {
  return {
    role: 'assistant',
    content: 'API key is missing. Please set the OPENAI_API_KEY in your .env file. For now, here\'s a mock response.\n\n' +
             'You find yourself in a mysterious forest. The trees tower above you, their branches swaying gently in the breeze.\n\n' +
             '1. Follow the narrow path deeper into the forest\n' +
             '2. Climb a tree to get a better view\n' +
             '3. Continue writing\n' +
             '4. End the story here\n' +
             '5. Write your own path...'
  };
}
