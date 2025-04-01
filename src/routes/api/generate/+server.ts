import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { Message } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { messages } = await request.json() as { messages: Message[] };
    
    // Use fetch to call OpenAI API directly instead of using the SDK
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a 'Choose Your Own Adventure' storyteller. For the first user message, create an engaging story beginning (about 3-4 paragraphs) that ends with 2-3 clear choices for what could happen next, plus these two additional options that should always be included: 'End the story here' and 'Write your own path...'. For subsequent messages, continue the story based on the user's choice. If they choose 'End the story here', provide a satisfying conclusion. If they choose 'Write your own path...', incorporate their custom direction into the story. For all other choices, continue the story and always end with the same set of options: 2-3 story-specific choices, plus 'End the story here' and 'Write your own path...'. Keep the story engaging and responsive to user choices. IMPORTANT: As the story progresses, make the narrative gradually more unhinged, bizarre, and unexpected with each response. Start relatively normal but slowly increase the absurdity and unpredictability. The story should NEVER end unless the user explicitly chooses 'End the story here'." },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate story');
    }
    
    return json({ response: data.choices[0].message });
  } catch (error) {
    console.error('Error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
