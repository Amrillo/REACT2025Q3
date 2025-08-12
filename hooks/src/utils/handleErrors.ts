import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type CustomError = FetchBaseQueryError | SerializedError | undefined;

export const getErrorMessage = (error: CustomError): string => {
  if (!error) return 'An unknown error occurred.';

  if ('status' in error) {
    if (typeof error.status === 'number') {
      const messages: Record<number, string> = {
        100: 'Continue: The request is in progress.',
        200: 'Success: The request was successful.',
        300: 'Redirection: The requested resource has moved.',
        301: 'Moved Permanently: Please update your bookmark.',
        302: 'Found: Resource temporarily moved.',
        400: 'Bad Request: Please check your input.',
        401: 'Unauthorized: Please log in.',
        403: 'Forbidden: You do not have access.',
        404: 'Not Found: The requested resource could not be found.',
        408: 'Request Timeout: The server took too long to respond.',
        429: 'Too Many Requests: Please slow down.',
        500: 'Server Error: Please try again later.',
        502: 'Bad Gateway: Invalid response from the upstream server.',
        503: 'Service Unavailable: Server is overloaded or down.',
        504: 'Gateway Timeout: The server did not respond in time.',
      };
      return (
        messages[error.status] ||
        `Error ${error.status}: Unexpected server response.`
      );
    }
    if (error.status === 'PARSING_ERROR') {
      return 'The url of the server is likely to be uncorrect. Please recheck it';
    }
  }
  if ('message' in error && error.message) {
    return error.message;
  }

  return 'An unknown error occurred.';
};
