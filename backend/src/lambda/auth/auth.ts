import { getPublicKey, verifyToken } from "./utils/tokenUtils";
import { JwtPayload } from "jsonwebtoken";

export const handler = async (event: any) => {
  try {
    const bearerToken = event.headers.Authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new Error("Missing or invalid Authorization header");
    }

    const token = bearerToken.split(" ")[1];
    if (!token) {
      throw new Error("Invalid Authorization header");
    }

    const keys = await getPublicKey();
    const verified = verifyToken(token, keys) as JwtPayload;

    const username = verified["cognito:username"];
    if (!username) {
      throw new Error("Username not found in token");
    }

    const groups = verified["cognito:groups"];
    const isAdmin = groups && groups.includes("admin");

    return {
      principalId: verified.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: ["arn:aws:execute-api:us-east-1:*:*/*/*"],
          },
        ],
      },
      context: {
        email: verified.email,
        isAdmin: isAdmin ? "true" : "false",
      },
    };
  } catch (error: any) {
    console.error("Error in authorizer:", error.message);
    const isExpired = error.message.includes("jwt expired");
    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: [event.methodArn],
          },
        ],
      },
      context: {
        error: error.message,
        tokenExpired: isExpired ? "true" : "false",
      },
    };
  }
};