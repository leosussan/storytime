<script lang="ts">
  import ChatInterface from '$lib/components/ChatInterface.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import { Button } from 'flowbite-svelte';
  import { generateStoryContent } from '$lib/services/api';
  import { storyStore, loadingStore, errorStore } from '$lib/stores/storyStore';
  import { onMount } from 'svelte';
  
  // Use the stores
  let messages = [];
  let loading = false;
  let error: string | null = null;
  
  // Subscribe to stores
  storyStore.subscribe(value => messages = value);
  loadingStore.subscribe(value => loading = value);
  errorStore.subscribe(value => error = value);
  
  onMount(() => {
    // Add event listener for beforeunload to warn about losing story progress
    window.addEventListener('beforeunload', (e) => {
      if (messages.length > 1) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    });
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  });
  
  async function handleSubmit(input: string) {
    // Reset error state
    errorStore.set(null);
    
    // Add user message to chat
    storyStore.addMessage({ role: 'user', content: input });
    loadingStore.set(true);
    
    try {
      const response = await generateStoryContent(messages);
      storyStore.addMessage(response);
    } catch (err) {
      console.error('Error generating story:', err);
      errorStore.set(err instanceof Error ? err.message : 'Unknown error occurred');
      storyStore.addMessage({ 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      });
    } finally {
      loadingStore.set(false);
    }
  }
  
  function resetStory() {
    if (confirm('Are you sure you want to reset the story? This cannot be undone.')) {
      storyStore.reset();
    }
  }
</script>

<svelte:head>
  <title>Choose Your Own Adventure</title>
  <meta name="description" content="Interactive storytelling where you choose your path" />
</svelte:head>

<div class="h-full flex flex-col p-4 max-w-4xl mx-auto">
  {#if error}
    <div class="mb-4">
      <ErrorMessage message={error} />
    </div>
  {/if}
  
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Your Adventure</h1>
    {#if messages.length > 1}
      <Button color="red" size="sm" on:click={resetStory}>
        Reset Story
      </Button>
    {/if}
  </div>
  
  <ChatInterface 
    {messages} 
    {loading} 
    onSubmit={handleSubmit} 
  />
  
  <div class="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
    <p>Powered by OpenAI's GPT-3.5 Turbo | Choose your path and shape your adventure</p>
  </div>
</div>
