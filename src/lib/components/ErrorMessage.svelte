<script lang="ts">
  export let message = 'An error occurred. Please try again.';
</script>

<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800" role="alert">
  <strong class="font-bold">Error: </strong>
  <span class="block sm:inline">{message}</span>
</div>
