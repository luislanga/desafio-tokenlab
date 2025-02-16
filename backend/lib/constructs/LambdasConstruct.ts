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
  public readonly calendarEventLambdas: any;

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
      getUserById: createLambda(
        this,
        defaultFunctionProps,
        "GetUserById",
        lambdaBasePath,
        "/user/controllers/getUserById.ts"
      ),

      listUsers: createLambda(
        this,
        defaultFunctionProps,
        "ListUsers",
        lambdaBasePath,
        "/user/controllers/listUsers.ts"
      ),
    };

    this.calendarEventLambdas = {
      createCalendarEvent: createLambda(
        this,
        defaultFunctionProps,
        "CreateCalendarEvent",
        lambdaBasePath,
        "/calendarEvent/controllers/createCalendarEvent.ts"
      ),

      listCalendarEvents: createLambda(
        this,
        defaultFunctionProps,
        "ListCalendarEvents",
        lambdaBasePath,
        "/calendarEvent/controllers/listCalendarEvents.ts"
      ),

      getCalendarEventById: createLambda(
        this,
        defaultFunctionProps,
        "GetCalendarEventById",
        lambdaBasePath,
        "/calendarEvent/controllers/getCalendarEventById.ts"
      ),

      deleteCalendarEvent: createLambda(
        this,
        defaultFunctionProps,
        "DeleteCalendarEvent",
        lambdaBasePath,
        "/calendarEvent/controllers/deleteCalendarEvent.ts"
      ),

      updateCalendarEvent: createLambda(
        this,
        defaultFunctionProps,
        "UpdateCalendarEvent",
        lambdaBasePath,
        "/calendarEvent/controllers/updateCalendarEvent.ts"
      ),
    };

    Object.values(this.userLambdas).forEach((lambda: any) => {
      props.table.grantReadWriteData(lambda);
    });
    Object.values(this.calendarEventLambdas).forEach((lambda: any) => {
      props.table.grantReadWriteData(lambda);
    });
  }
}
