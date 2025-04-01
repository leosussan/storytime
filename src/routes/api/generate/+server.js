import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
  try {
    const { messages } = await request.json();
    
    // Mock response for development without OpenAI API
    const mockResponse = {
      content: "This is a mock story response while the OpenAI integration is being set up.\n\nOnce upon a time in a land far away, there lived a curious explorer who loved to discover new places. Every day brought a new adventure, and today was no different. As the sun rose over the misty mountains, our hero prepared for the journey ahead..."
    };
    
    return json({ response: mockResponse });
  } catch (error) {
    console.error('Error:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
