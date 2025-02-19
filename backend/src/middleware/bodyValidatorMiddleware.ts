import { Schema } from "joi";
import { createHttpError } from "../utils/createHttpError";

export const bodyValidatorMiddleware = (schema: Schema) => ({
  before: (handler: any, next: any) => {
    const { body } = handler.event;
    if (!body) {
      throw createHttpError(400, "EMPTY_BODY");
    }

    const data = JSON.parse(body);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      throw createHttpError(400, `Validation Error: ${message}`);
    }

    return next();
  },
});
