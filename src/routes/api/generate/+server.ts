import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { Message, ChatCompletionResponse } from '$lib/types';

import { SYSTEM_PROMPT, isApiKeyAvailable, getMockResponse } from '$lib/server/openai';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { messages } = await request.json() as { messages: Message[] };
    
    // Check if API key is available
    if (!isApiKeyAvailable()) {
      console.warn('OpenAI API key is not set. Using mock response.');
      return json({
        response: getMockResponse()
      });
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json() as ChatCompletionResponse;
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate story');
    }
    
    return json({ response: data.choices[0].message });
  } catch (error) {
    console.error('API Error:', error);
    return json(
      { error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
