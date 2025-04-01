import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Using Cloudflare adapter for deployment to Cloudflare Pages
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// Optional: Customize routes if needed
			// routes: {
			//   include: ['/*'],
			//   exclude: ['<all>']
			// }
		})
	}
};

export default config;
