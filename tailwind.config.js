/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Use dynamic import for flowbite plugin in ESM
    (await import('flowbite/plugin')).default
  ],
  darkMode: 'class'
}
