<script lang="ts">
  import { Avatar, Button, Spinner, Textarea } from 'flowbite-svelte';
  import { onMount, afterUpdate } from 'svelte';
  import type { Message } from '$lib/types';
  import { isStoryConcluded, exportStoryAsText } from '$lib/utils/storyExport';
  
  export let messages: Message[] = [];
  export let loading = false;
  export let onSubmit: (input: string) => void;
  export let showExport = false;
  
  let userInput = '';
  let messagesContainer: HTMLElement;
  
  function handleSubmit() {
    if (!userInput.trim() || loading) return;
    onSubmit(userInput.trim());
    userInput = '';
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
  
  function handleExport() {
    exportStoryAsText(messages);
  }
  
  // Auto-scroll to bottom when messages change
  afterUpdate(() => {
    if (messagesContainer) {
      scrollToBottom();
    }
  });
  
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white">Choose Your Own Adventure</h2>
    <p class="text-gray-600 dark:text-gray-400">Choose from options, write your own path, or end the story anytime</p>
  </div>
  
  <div 
    bind:this={messagesContainer}
    class="messages flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
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
  
  {#if showExport}
    <div class="p-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-center">
      <Button color="green" on:click={handleExport}>
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
        Export Story
      </Button>
    </div>
  {/if}
  
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
