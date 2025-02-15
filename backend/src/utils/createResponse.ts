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
  });