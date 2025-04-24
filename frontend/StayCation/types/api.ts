export interface ApiError {
      message: string;
      status?: number;
      data?: any;
    }
    
    export function isApiError(error: unknown): error is ApiError {
      return typeof error === 'object' && error !== null && 'message' in error;
    }