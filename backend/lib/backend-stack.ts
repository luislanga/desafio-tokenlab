import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDbTableConstruct } from './constructs/DynamoDbTableConstruct';
import { CognitoUserPoolConstruct } from './constructs/CognitoUserPoolConstruct';

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

  }
}
