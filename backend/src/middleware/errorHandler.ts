import { createResponse } from "../utils/createResponse";

export const errorHandler = () => ({
  onError: async (handler: any, next: any) => {
    const statusCode = handler.error?.statusCode || 500;
    const errorMessage = handler.error?.message || "An unknown error occurred";

    handler.response = createResponse(statusCode, errorMessage);

    return next();
  },
});