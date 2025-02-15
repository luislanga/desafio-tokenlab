import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createResponse } from "../../../utils/createResponse";
import { createHttpError } from "../../../utils/createHttpError";
import { listUsersService } from "../services/listUsersService";


const handlerFunction = async (event: any) => {

  const users = await listUsersService();
  if (!users[0]) throw createHttpError(404, "No users found");

  return createResponse(200, users);
};

export const handler = middy(handlerFunction)
  .use(errorHandler());