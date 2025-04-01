<script>
  import ChatInterface from '$lib/components/ChatInterface.svelte';
  import { Card } from 'flowbite-svelte';
  
  let messages = [
    { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' }
  ];
  let loading = false;
  
  async function handleSubmit(input) {
    // Add user message to chat
    messages = [...messages, { role: 'user', content: input }];
    loading = true;
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to chat
        messages = [...messages, { 
          role: 'assistant', 
          content: data.response.content 
        }];
      } else {
        throw new Error(data.error || 'Failed to generate story');
      }
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
  <title>AI Story Creator</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <Card class="mb-6">
    <h1 class="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">AI Story Creator</h1>
    <p class="text-center text-gray-600 dark:text-gray-400">
      Unleash your imagination and let our AI help you craft amazing stories.
      Just describe what you'd like to create, and watch your ideas come to life!
    </p>
  </Card>
  
  <ChatInterface 
    messages={messages} 
    {loading} 
    onSubmit={handleSubmit} 
  />
  
  <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
    <p>Powered by OpenAI's GPT-3.5 Turbo. Create stories, poems, adventures, and more!</p>
  </div>
</div>
