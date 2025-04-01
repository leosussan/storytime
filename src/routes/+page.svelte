<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
  let messages = [
    { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' }
  ];
  let userInput = '';
  let loading = false;
  
  async function handleSubmit() {
    if (!userInput.trim()) return;
    
    // Add user message to chat
    messages = [...messages, { role: 'user', content: userInput }];
    const currentInput = userInput;
    userInput = '';
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
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<svelte:head>
  <title>AI Story Creator</title>
</svelte:head>

<div class="container">
  <header>
    <h1>AI Story Creator</h1>
    <p>Chat with AI to create amazing stories</p>
  </header>
  
  <div class="chat-container">
    <div class="messages">
      {#each messages as message}
        <div class="message {message.role === 'user' ? 'user-message' : 'ai-message'}">
          <p>{message.content}</p>
        </div>
      {/each}
      
      {#if loading}
        <div class="message ai-message loading">
          <p>Thinking...</p>
        </div>
      {/if}
    </div>
    
    <div class="input-area">
      <textarea 
        bind:value={userInput} 
        on:keydown={handleKeydown}
        placeholder="Type your message here..."
        disabled={loading}
      ></textarea>
      <button on:click={handleSubmit} disabled={loading || !userInput.trim()}>
        Send
      </button>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  h1 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .chat-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .messages {
    height: 500px;
    overflow-y: auto;
    padding: 20px;
  }
  
  .message {
    margin-bottom: 15px;
    padding: 10px 15px;
    border-radius: 10px;
    max-width: 80%;
  }
  
  .user-message {
    background-color: #e1f5fe;
    margin-left: auto;
  }
  
  .ai-message {
    background-color: #f5f5f5;
  }
  
  .loading {
    opacity: 0.7;
  }
  
  .input-area {
    display: flex;
    padding: 15px;
    border-top: 1px solid #eee;
  }
  
  textarea {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    height: 60px;
  }
  
  button {
    margin-left: 10px;
    padding: 0 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>
