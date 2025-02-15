import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDbTableConstruct } from './constructs/DynamoDbTableConstruct';
import { CognitoUserPoolConstruct } from './constructs/CognitoUserPoolConstruct';
import { LambdasConstruct } from './constructs/LambdasConstruct';

export class TokenlabBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDbTable = new DynamoDbTableConstruct(
      this,
      "DynamoDbTableConstruct"
    );

    const { table } = dynamoDbTable

    const cognitoUserPool = new CognitoUserPoolConstruct(
      this,
      "CognitoUserPoolConstruct",
      {
        table,
      }
    );

    const { userPoolId } = cognitoUserPool.userPool;
    const { userPoolArn } = cognitoUserPool.userPool;

    const lambdas = new LambdasConstruct(this, "LambdasConstruct", {
      table,
      userPoolId,
      userPoolArn,
    });
  }
}
