import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { createLambda } from "./helpers/createLambda";
import { join } from "path";

interface LambdasConstructProps {
  table: dynamodb.Table;
  userPoolId: string;
  userPoolArn: string;
}

export class LambdasConstruct extends Construct {
  public readonly userLambdas: any;

  constructor(scope: Construct, id: string, props: LambdasConstructProps) {
    super(scope, id);

    const lambdaBasePath = join(__dirname, "../../src/lambda");

    const defaultFunctionProps: NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "handler",
      environment: {
        TABLE_NAME: props.table.tableName,
        USER_POOL_ID: props.userPoolId,
      },
      entry: "",
    };

    this.userLambdas = {
      hello: createLambda(
        this,
        defaultFunctionProps,
        "Hello",
        lambdaBasePath,
        "/user/controllers/hello.ts"
      ),
    };
  }
}
