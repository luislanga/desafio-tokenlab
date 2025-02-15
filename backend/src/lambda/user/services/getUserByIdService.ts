import { query } from "../../../db/dynamoDbClient";
import { getUserByIdDynamoDbAdapter } from "../adapters/getUserByIdDdbAdapter";

export const getUserByIdService = async (userId: string) => {
    const queryParams = getUserByIdDynamoDbAdapter(userId);
    const result = await query(queryParams);
    return result[0];
  };