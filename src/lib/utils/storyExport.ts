import type { Message } from '$lib/types';

/**
 * Formats the story messages into a clean text format for export
 */
export function formatStoryForExport(messages: Message[]): string {
  // Filter out system messages and format the conversation
  const storyMessages = messages.filter(msg => msg.role !== 'system');
  
  let exportText = "# Your Adventure Story\n\n";
  
  // Skip the first welcome message and process the rest
  for (let i = 1; i < storyMessages.length; i++) {
    const message = storyMessages[i];
    
    if (message.role === 'user') {
      // For user messages, format as choices/inputs
      exportText += `## Your choice: ${message.content}\n\n`;
    } else if (message.role === 'assistant') {
      // For AI messages, format as story content
      // Remove the numbered options for cleaner export
      const content = message.content.replace(/(\d+\.\s.*?)(?=\n\d+\.|\n$|$)/g, '');
      exportText += `${content}\n\n`;
    }
  }
  
  return exportText;
}

/**
 * Exports the story as a text file
 */
export function exportStoryAsText(messages: Message[], filename = 'your-adventure-story.txt'): void {
  const storyText = formatStoryForExport(messages);
  const blob = new Blob([storyText], { type: 'text/plain;charset=utf-8' });
  
  // Create download link and trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Checks if the story has concluded
 * (Looks for "End the story here" in the last user message)
 */
export function isStoryConcluded(messages: Message[]): boolean {
  if (messages.length < 2) return false;
  
  // Find the last user message
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      // Check if the user chose to end the story
      return messages[i].content.toLowerCase().includes('end the story') || 
             messages[i].content === '4' || // Common option number for ending story
             /^\s*4\s*$/.test(messages[i].content); // Just the number 4
    }
  }
  
  return false;
}
