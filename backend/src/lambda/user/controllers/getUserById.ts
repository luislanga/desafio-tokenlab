import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createResponse } from "../../../utils/createResponse";
import { getUserByIdService } from "../services/getUserByIdService";
import { createHttpError } from "../../../utils/createHttpError";

export const handlerFunction = async (event: any) => {
  const userId = event.requestContext.authorizer.principalId;
  const user = await getUserByIdService(userId);
  if (!user) return createHttpError(404, "USER_NOT_FOUND");

  return createResponse(200, user);
};

export const handler = middy(handlerFunction).use(errorHandler());
