class HttpError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.name = "HttpError";
      Error.captureStackTrace(this, HttpError);
    }
  }
  
  export const createHttpError = (
    statusCode: number,
    message: string
  ): HttpError => {
    return new HttpError(statusCode, message);
  };