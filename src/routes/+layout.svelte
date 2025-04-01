<script>
  import "../app.css";
  import { DarkMode } from 'flowbite-svelte';
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div class="container mx-auto px-4 py-2 h-screen">
    <slot />
  </div>
  <div class="fixed bottom-5 right-5">
    <DarkMode />
  </div>
</div>
