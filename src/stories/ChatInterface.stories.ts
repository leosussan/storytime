import type { Meta, StoryObj } from '@storybook/svelte';
import ChatInterface from '../lib/components/ChatInterface.svelte';
import type { Message } from '$lib/types';

const meta: Meta<typeof ChatInterface> = {
  title: 'Components/ChatInterface',
  component: ChatInterface,
  argTypes: {
    messages: { control: 'array' },
    loading: { control: 'boolean' },
    onSubmit: { action: 'submitted' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    messages: [],
    loading: false
  }
};

export const WithWelcomeMessage: Story = {
  args: {
    messages: [
      { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' }
    ],
    loading: false
  }
};

export const WithConversation: Story = {
  args: {
    messages: [
      { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' },
      { role: 'user', content: 'Can you write a short story about a space explorer?' },
      { role: 'assistant', content: 'Sure! Here\'s a story about a space explorer named Alex who discovers a mysterious planet...\n\nTHE VOID WALKER\n\nAlex Mercer had always dreamed of the stars. As a child, while others played in the dirt, Alex\'s eyes were fixed upward, wondering what mysteries lay beyond the twinkling lights that dotted the night sky.\n\nNow, as the solo pilot of the Artemis VII, humanity\'s most advanced exploration vessel, Alex was about to become the first human to venture beyond the Kuiper Belt, into the true void of interstellar space.' }
    ],
    loading: false
  }
};

export const Loading: Story = {
  args: {
    messages: [
      { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' },
      { role: 'user', content: 'Write a fantasy story with dragons' }
    ],
    loading: true
  }
};

export const WithExportButton: Story = {
  args: {
    messages: [
      { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' },
      { role: 'user', content: 'Can you write a short story about a space explorer?' },
      { role: 'assistant', content: 'Sure! Here\'s a story about a space explorer named Alex who discovers a mysterious planet...\n\nTHE VOID WALKER\n\nAlex Mercer had always dreamed of the stars. As a child, while others played in the dirt, Alex\'s eyes were fixed upward, wondering what mysteries lay beyond the twinkling lights that dotted the night sky.\n\nNow, as the solo pilot of the Artemis VII, humanity\'s most advanced exploration vessel, Alex was about to become the first human to venture beyond the Kuiper Belt, into the true void of interstellar space.\n\n1. Continue exploring the void\n2. Turn back to safety\n3. Continue writing\n4. End the story here\n5. Write your own path...' },
      { role: 'user', content: 'End the story here' },
      { role: 'assistant', content: 'As Alex gazed into the infinite darkness ahead, a sense of peace washed over them. They had come further than any human before, and that was enough. With a gentle smile, they turned the Artemis VII around, carrying the knowledge of what lies beyond back to Earth. The mysteries of the void would wait for another explorer, another day. For now, Alex\'s journey had reached its perfect conclusion.\n\nTHE END' }
    ],
    loading: false,
    showExport: true
  }
};
