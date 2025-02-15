import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class DynamoDbTableConstruct extends Construct {
    public readonly table: dynamodb.Table;
  
    constructor(scope: Construct, id: string) {
      super(scope, id);
  
      this.table = new dynamodb.Table(this, "tokenlab-calendar-table", {
        tableName: "tokenlab-calendar-table",
        partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PROVISIONED,
        readCapacity: 5,
        writeCapacity: 5,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
  
      this.table.addGlobalSecondaryIndex({
        indexName: "GSI1",
        partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
        sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
        projectionType: dynamodb.ProjectionType.ALL,
        readCapacity: 3,
        writeCapacity: 5,
      });
    }
  }