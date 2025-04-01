<script lang="ts">
  import ChatInterface from '$lib/components/ChatInterface.svelte';
  import { generateStoryContent } from '$lib/services/api';
  import type { Message } from '$lib/types';
  
  let messages: Message[] = [
    { role: 'assistant', content: 'Welcome to Choose Your Own Adventure! Describe the kind of story you\'d like to begin (fantasy, sci-fi, mystery, etc.), and I\'ll create the opening scene with choices for you to direct where the story goes next. At any point, you can choose to end the story or write your own custom path!' }
  ];
  let loading = false;
  
  async function handleSubmit(input: string) {
    // Add user message to chat
    messages = [...messages, { role: 'user', content: input }];
    loading = true;
    
    try {
      const response = await generateStoryContent(messages);
      messages = [...messages, response];
    } catch (error) {
      console.error('Error:', error);
      messages = [...messages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }];
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Choose Your Own Adventure</title>
</svelte:head>

<div class="h-full">
  <ChatInterface 
    messages={messages} 
    {loading} 
    onSubmit={handleSubmit} 
  />
  
  <div class="mt-1 mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
    <p>Powered by OpenAI's GPT-3.5 Turbo | Choose your path and shape your adventure</p>
  </div>
</div>
