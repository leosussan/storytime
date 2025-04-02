# Interactive Story Adventure

An AI-powered interactive storytelling application built with SvelteKit that lets users create and explore their own adventure stories.

## Features

- Dynamic story generation using OpenAI's API
- Interactive chat-like interface for story progression
- Multiple choice and free-form response options
- Story saving and persistence between sessions
- Export your completed stories as text files
- Responsive design for desktop and mobile

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- An OpenAI API key

### Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How It Works

1. The application presents users with an initial story prompt
2. Users can select from suggested options or write their own responses
3. The AI generates the next part of the story based on user input
4. The story continues until the user chooses to end it
5. Completed stories can be exported as text files

## Technologies

- SvelteKit
- TypeScript
- Tailwind CSS
- OpenAI API
- Vitest for testing

## License

[MIT](LICENSE)
