import {
  BatchWriteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
  QueryCommand,
  UpdateCommandInput,
  UpdateCommand,
  DeleteCommandInput,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// Singleton client for reusability

let ddbClient: DynamoDBDocumentClient;
const getDynamoDBClient = () => {
  if (!ddbClient) {
    const client = new DynamoDBClient({});
    ddbClient = DynamoDBDocumentClient.from(client);
  }
  return ddbClient;
};

const dynamodb = getDynamoDBClient();

export const query = async (params: QueryCommandInput) => {
  try {
    const result = await dynamodb.send(new QueryCommand(params));
    return result.Items || [];
  } catch (error) {
    console.error(error);
    throw new Error("Error querying item from DynamoDB");
  }
};

export const paginatedQuery = async (params: QueryCommandInput) => {
  try {
    const result = await dynamodb.send(new QueryCommand(params));
    return {
      items: result.Items || [],
      lastEvaluatedKey: result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
        : null,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error querying item from DynamoDB");
  }
};

export const create = async (params: PutCommandInput) => {
  try {
    const result = await dynamodb.send(new PutCommand(params));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating item in DynamoDB");
  }
};

export const update = async (params: UpdateCommandInput) => {
  try {
    const result = await dynamodb.send(new UpdateCommand(params));
    return result.Attributes || {};
  } catch (error) {
    console.error(error);
    throw new Error("Error updating item in DynamoDB");
  }
};

export const standardDelete = async (params: DeleteCommandInput) => {
  try {
    const result = await dynamodb.send(new DeleteCommand(params));
    return result.Attributes || {};
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting item in DynamoDB");
  }
};

export const batchDelete = async (params: any) => {
  try {
    const result = await dynamodb.send(new BatchWriteItemCommand(params));

    if (
      result.UnprocessedItems &&
      Object.keys(result.UnprocessedItems).length > 0
    ) {
      console.warn("Some items were not processed:", result.UnprocessedItems);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error performing batch delete in DynamoDB");
  }
};
