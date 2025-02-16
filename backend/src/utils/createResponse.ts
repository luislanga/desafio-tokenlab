export const createResponse = (
  statusCode: number,
  messageOrData: string | Record<string, any>
) => ({
  statusCode,
  body: JSON.stringify(
    typeof messageOrData === "string"
      ? { message: messageOrData }
      : messageOrData,
    null,
    2
  ),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT",
  },
});
