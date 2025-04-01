<script lang="ts">
  import "../app.css";
  import { DarkMode } from 'flowbite-svelte';
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  <div class="container mx-auto px-4 py-2 min-h-screen max-w-4xl">
    <slot />
  </div>
</div>
