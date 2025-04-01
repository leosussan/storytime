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
          { role: "system", content: "You are a 'Choose Your Own Adventure' storyteller. For the first user message, create an engaging story beginning (about 3-4 paragraphs) that ends with numbered choices as follows: 1-2 should be story-specific choices, then always include these standard options: '3. Continue writing' (to elaborate on the current scene), '4. End the story here' and '5. Write your own path...'. For subsequent messages, continue the story based on the user's choice. If they choose 'End the story here', provide a satisfying conclusion. If they choose 'Write your own path...', incorporate their custom direction into the story. If they choose 'Continue writing', elaborate on the current scene without advancing to a new plot point. For all other choices, continue the story and always end with the same set of numbered options: 1-2 should be story-specific choices, followed by '3. Continue writing', '4. End the story here' and '5. Write your own path...'. Keep the story engaging and responsive to user choices. IMPORTANT: As the story progresses, make the narrative gradually more unhinged, bizarre, and unexpected with each response. Start relatively normal but slowly increase the absurdity and unpredictability. The story should NEVER end unless the user explicitly chooses 'End the story here'." },
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
