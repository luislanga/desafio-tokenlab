import { query } from "../../../db/dynamoDbClient";
import { listUsersDynamoDbAdapter } from "../adapters/listUsersDdbAdapter";

export const listUsersService = async () => {
    const queryParams = listUsersDynamoDbAdapter();
    return await query(queryParams);
  };