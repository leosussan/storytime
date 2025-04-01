import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
  try {
    const { messages } = await request.json();
    
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
          { role: "system", content: "You are a creative storyteller. Create engaging and imaginative stories based on user prompts." },
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
    return json({ error: error.message }, { status: 500 });
  }
}
