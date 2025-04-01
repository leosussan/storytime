import { OpenAI } from 'openai';
import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';

export async function POST({ request }) {
  try {
    const { messages } = await request.json();
    
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a creative storyteller. Create engaging and imaginative stories based on user prompts." },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return json({ response: response.choices[0].message });
  } catch (error) {
    console.error('Error:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
