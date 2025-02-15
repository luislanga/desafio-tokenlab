import { User } from "../../../../../types/User";
import { create } from "../../../db/dynamoDbClient";
import { createUserDynamoDbAdapter } from "../adapters/createUserDdbAdapter";

export const createUserService = async (user: User) => {
  const putParams = createUserDynamoDbAdapter(user);
  return await create(putParams);
};
