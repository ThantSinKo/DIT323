// Base custom error class that extends the built-in Error
class BaseError extends Error {
    constructor(message, options = {}) {
      super(message);
      
      // Set the name to the class name by default
      this.name = this.constructor.name;
      
      // Capture stack trace, excluding the constructor call from the stack
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      
      // Add custom properties
      this.timestamp = options.timestamp || new Date();
      this.code = options.code || 'UNKNOWN_ERROR';
      this.httpStatusCode = options.httpStatusCode;
      this.metadata = options.metadata || {};
      this.isOperational = options.isOperational !== undefined ? options.isOperational : true;
    }
  
    // Add a method to serialize the error
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        timestamp: this.timestamp,
        httpStatusCode: this.httpStatusCode,
        metadata: this.metadata,
        stack: this.stack
      };
    }
  }
  
  // Specific error types that extend the base error
  class ValidationError extends BaseError {
    constructor(message, options = {}) {
      super(message, { 
        code: options.code || 'VALIDATION_ERROR',
        httpStatusCode: options.httpStatusCode || 400,
        ...options
      });
    }
  }
  
  class DatabaseError extends BaseError {
    constructor(message, options = {}) {
      super(message, {
        code: options.code || 'DATABASE_ERROR',
        httpStatusCode: options.httpStatusCode || 500,
        ...options
      });
    }
  }
  
  class NotFoundError extends BaseError {
    constructor(message, options = {}) {
      super(message, {
        code: options.code || 'NOT_FOUND',
        httpStatusCode: options.httpStatusCode || 404,
        ...options
      });
    }
  }
  
  class AuthenticationError extends BaseError {
    constructor(message, options = {}) {
      super(message, {
        code: options.code || 'AUTHENTICATION_ERROR',
        httpStatusCode: options.httpStatusCode || 401,
        ...options
      });
    }
  }
  
  class AuthorizationError extends BaseError {
    constructor(message, options = {}) {
      super(message, {
        code: options.code || 'AUTHORIZATION_ERROR',
        httpStatusCode: options.httpStatusCode || 403,
        ...options
      });
    }
  }
  
  // Example usage
  function exampleUsage() {
    try {
      // Simulate a validation error
      const userData = { username: 'joe' };
      if (!userData.email) {
        throw new ValidationError('Email is required', {
          metadata: { providedFields: Object.keys(userData) }
        });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error('Validation failed:', error.message);
        console.error('Details:', error.toJSON());
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
  
  // Export all error classes
  module.exports = {
    BaseError,
    ValidationError,
    DatabaseError,
    NotFoundError,
    AuthenticationError,
    AuthorizationError
  };