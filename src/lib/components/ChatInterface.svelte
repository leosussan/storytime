<script>
  import { Avatar, Button, Spinner, Textarea } from 'flowbite-svelte';
  
  export let messages = [];
  export let loading = false;
  export let onSubmit = () => {};
  
  let userInput = '';
  let messagesContainer;
  
  function handleSubmit() {
    if (!userInput.trim()) return;
    onSubmit(userInput);
    userInput = '';
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
  
  // Auto-scroll to bottom when messages change
  $: if (messagesContainer && messages) {
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white">Choose Your Own Adventure</h2>
    <p class="text-gray-600 dark:text-gray-400">Choose from options, write your own path, or end the story anytime</p>
  </div>
  
  <div 
    bind:this={messagesContainer}
    class="messages h-[calc(100vh-160px)] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
  >
    {#each messages as message}
      <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] {message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-lg p-3 shadow">
          {#if message.role === 'assistant'}
            <div class="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300 dark:border-gray-600">
              <Avatar class="w-8 h-8" initials="AI" />
              <span class="font-semibold">AI Storyteller</span>
            </div>
          {/if}
          <p class="whitespace-pre-line">{message.content}</p>
        </div>
      </div>
    {/each}
    
    {#if loading}
      <div class="flex justify-start">
        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 shadow flex items-center gap-2">
          <Spinner size="4" />
          <span class="text-gray-900 dark:text-white">Creating your story...</span>
        </div>
      </div>
    {/if}
  </div>
  
  <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="flex gap-2">
      <Textarea
        class="flex-grow"
        rows="3"
        bind:value={userInput}
        on:keydown={handleKeydown}
        placeholder="Type your story idea or choose a path..."
        disabled={loading}
      />
      <div class="flex items-end">
        <Button
          color="blue"
          on:click={handleSubmit}
          disabled={loading || !userInput.trim()}
        >
          {#if loading}
            <Spinner size="4" class="mr-2" />
          {/if}
          Send
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom scrollbar */
  .messages::-webkit-scrollbar {
    width: 6px;
  }
  
  .messages::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .messages::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }
</style>
