import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "node:path";
import { Construct } from "constructs";

export const createLambda = (
  scope: Construct,
  defaultFunctionProps: NodejsFunctionProps,
  name: string,
  lambdaBasePath: string,
  handlerPath: string
) => {
  return new NodejsFunction(scope, name, {
    ...defaultFunctionProps,
    entry: join(lambdaBasePath, handlerPath),
  });
};