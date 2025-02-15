import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class AuthLambdaConstruct extends Construct {
  public readonly lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: any) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "AuthLambdaFunction", {
      functionName: "LambdaAuthorizer",
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "handler",
      entry: join(__dirname, "../../src/lambda/auth/auth.ts"),
      environment: {
        USER_POOL_ID: props.userPoolId,
      },
    });
  }
}