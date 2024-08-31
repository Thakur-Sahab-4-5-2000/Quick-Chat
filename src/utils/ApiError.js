class ApiError extends Error {
    constructor(errorCode, message, statusCode, stack) {
      super();
      this.statusCode = statusCode;
      this.message = message 
      this.errorCode = errorCode
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  