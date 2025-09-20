export const createErrorMessage = (error, defaultMessage = 'An unexpected error occurred') => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return defaultMessage;
};

export const logError = (error, context = '') => {
  console.error(`[${context}] Error:`, error);
};