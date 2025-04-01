/**
 * Tracks user interactions with the story
 * @param action - The action the user took
 * @param details - Additional details about the action
 */
export function trackStoryInteraction(action: string, details?: Record<string, any>): void {
  // This is a placeholder for actual analytics implementation
  console.log(`[Analytics] ${action}`, details);
}

/**
 * Tracks errors that occur in the application
 * @param error - The error that occurred
 * @param context - Additional context about where the error occurred
 */
export function trackError(error: Error | string, context?: string): void {
  console.error(`[Error] ${context || 'Application error'}:`, error);
}
