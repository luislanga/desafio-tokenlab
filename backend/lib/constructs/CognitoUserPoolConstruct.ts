import * as cognito from "aws-cdk-lib/aws-cognito";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { join } from "path";

export class CognitoUserPoolConstruct extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id);

    const postConfirmationLambda = new NodejsFunction(
        this,
        "PostConfirmationCreateUser",
        {
          functionName: "PostConfirmationCreateUser",
          runtime: lambda.Runtime.NODEJS_22_X,
          handler: "handler",
          entry: join(
            __dirname,
            "../../src/lambda/user/controllers/createUser.ts"
          ),
          environment: {
            TABLE_NAME: props.table.tableName,
          },
        }
      );
  
      props.table.grantReadWriteData(postConfirmationLambda);

    this.userPool = new cognito.UserPool(
      this,
      "tokenlab-calendar-userpool",
      {
        userPoolName: "tokenlab-calendar-userpool",
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        selfSignUpEnabled: true,
        autoVerify: {
          email: true,
        },
        standardAttributes: {
          email: {
            required: true,
            mutable: true,
          },
        },
        lambdaTriggers: {
          postConfirmation: postConfirmationLambda,
        },
      }
    );

    const domain = this.userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: "tokenlab-calendar",
      },
    });

    this.userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool: this.userPool,
      generateSecret: false,
      authFlows: {
        userPassword: true,
        adminUserPassword: true,
        custom: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
      oAuth: {
        // change this
        callbackUrls: ["http://localhost:5173/"],
        logoutUrls: ["http://localhost:5173/"],
        flows: {
          authorizationCodeGrant: true,
        },
      },
    });
  }
}