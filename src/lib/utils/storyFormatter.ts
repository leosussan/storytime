/**
 * Formats the story text with proper styling
 * @param text - The raw story text
 * @returns Formatted HTML string
 */
export function formatStoryText(text: string): string {
  // Replace numbered options with styled versions
  return text.replace(
    /(\d+\.\s.*?)(?=\n\d+\.|\n$|$)/g, 
    '<div class="option">$1</div>'
  );
}

/**
 * Extracts the available options from the story text
 * @param text - The story text containing options
 * @returns Array of option strings
 */
export function extractOptions(text: string): string[] {
  const options: string[] = [];
  const regex = /(\d+\.\s.*?)(?=\n\d+\.|\n$|$)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    options.push(match[1].trim());
  }
  
  return options;
}
