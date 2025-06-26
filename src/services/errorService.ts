// Centralized error handling and reporting service

export function handleApiError(error: any, context?: string): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && error.error) return error.error;
  if (context) return `Error in ${context}`;
  return 'An unknown error occurred.';
}

// Optionally, extend to log errors to a remote service or file
export function logError(error: any, context?: string) {
  // For now, just log to console
  // In production, send to Sentry, LogRocket, etc.
  console.error(`[${context || 'Error'}]:`, error);
}
