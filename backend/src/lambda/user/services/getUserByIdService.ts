import { get } from "../../../db/dynamoDbClient";
import { getUserByIdDynamoDbAdapter } from "../adapters/getUserByIdDdbAdapter";

export const getUserByIdService = async (userId: string) => {
    const queryParams = getUserByIdDynamoDbAdapter(userId);
    return await get(queryParams);
  };