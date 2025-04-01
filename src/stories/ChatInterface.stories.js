import ChatInterface from '../lib/components/ChatInterface.svelte';

export default {
  title: 'Components/ChatInterface',
  component: ChatInterface,
  argTypes: {
    messages: { control: 'array' },
    loading: { control: 'boolean' },
    onSubmit: { action: 'submitted' }
  }
};

const Template = (args) => ({
  Component: ChatInterface,
  props: args
});

export const Empty = Template.bind({});
Empty.args = {
  messages: [],
  loading: false
};

export const WithWelcomeMessage = Template.bind({});
WithWelcomeMessage.args = {
  messages: [
    { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' }
  ],
  loading: false
};

export const WithConversation = Template.bind({});
WithConversation.args = {
  messages: [
    { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' },
    { role: 'user', content: 'Can you write a short story about a space explorer?' },
    { role: 'assistant', content: 'Sure! Here\'s a story about a space explorer named Alex who discovers a mysterious planet...\n\nTHE VOID WALKER\n\nAlex Mercer had always dreamed of the stars. As a child, while others played in the dirt, Alex\'s eyes were fixed upward, wondering what mysteries lay beyond the twinkling lights that dotted the night sky.\n\nNow, as the solo pilot of the Artemis VII, humanity\'s most advanced exploration vessel, Alex was about to become the first human to venture beyond the Kuiper Belt, into the true void of interstellar space.' }
  ],
  loading: false
};

export const Loading = Template.bind({});
Loading.args = {
  messages: [
    { role: 'assistant', content: 'Hello! I\'m your AI storyteller. What kind of story would you like me to create today?' },
    { role: 'user', content: 'Write a fantasy story with dragons' }
  ],
  loading: true
};
