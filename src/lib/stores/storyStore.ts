import { writable } from 'svelte/store';
import type { Message } from '$lib/types';

// Initial welcome message
const WELCOME_MESSAGE: Message = { 
  role: 'assistant', 
  content: 'Welcome to Choose Your Own Adventure! Describe the kind of story you\'d like to begin (fantasy, sci-fi, mystery, etc.), and I\'ll create the opening scene with choices for you to direct where the story goes next. At any point, you can choose to end the story or write your own custom path!' 
};

// Try to load saved story from localStorage
function loadSavedStory(): Message[] {
  if (typeof window === 'undefined') return [WELCOME_MESSAGE];
  
  try {
    const saved = localStorage.getItem('story-messages');
    return saved ? JSON.parse(saved) : [WELCOME_MESSAGE];
  } catch (e) {
    console.warn('Failed to load saved story:', e);
    return [WELCOME_MESSAGE];
  }
}

// Create the store
function createStoryStore() {
  const { subscribe, set, update } = writable<Message[]>(loadSavedStory());
  
  return {
    subscribe,
    addMessage: (message: Message) => update(messages => {
      const newMessages = [...messages, message];
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('story-messages', JSON.stringify(newMessages));
        } catch (e) {
          console.warn('Failed to save story:', e);
        }
      }
      return newMessages;
    }),
    reset: () => {
      set([WELCOME_MESSAGE]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('story-messages');
      }
    }
  };
}

export const storyStore = createStoryStore();
export const loadingStore = writable(false);
export const errorStore = writable<string | null>(null);
