import type { Message, ApiResponse } from '$lib/types';

/**
 * Sends a request to the API to generate story content based on previous messages
 * @param messages - Array of previous messages in the conversation
 * @returns Promise resolving to the AI's response message
 * @throws Error if the API request fails
 */
export async function generateStoryContent(messages: Message[]): Promise<Message> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });
    
    const data = await response.json() as ApiResponse;
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate story');
    }
    
    return data.response;
  } catch (error) {
    console.error('Error generating story content:', error);
    throw error;
  }
}
