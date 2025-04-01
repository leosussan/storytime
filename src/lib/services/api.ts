import type { Message } from '$lib/types';

export async function generateStoryContent(messages: Message[]): Promise<Message> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate story');
  }
  
  return data.response;
}
