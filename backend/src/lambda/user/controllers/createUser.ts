import middy from "middy";
import { createUserService } from "../services/createUserService";
import { errorHandler } from "../../../middleware/errorHandler";

export const handlerFunction = async (event: any) => {
  const userId = event.request.userAttributes.sub;
  console.log(event);

  const user = {
    userId,
    username: "",
  };

  await createUserService(user);

  return event;
};

export const handler = middy(handlerFunction).use(errorHandler());
