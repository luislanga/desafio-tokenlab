import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { AuthLambdaConstruct } from "./AuthLambdaConstruct";
import { addMethods } from "./helpers/addMethods";

export class ApiGatewayConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { userLambdas, userPoolId }: any
  ) {
    super(scope, id);

    const api = new apigateway.RestApi(this, "ApiGateway", {
      restApiName: "tokenlab-calendar-api",
    });

    const authLambda = new AuthLambdaConstruct(this, "AuthLambdaConstruct", {
      userPoolId,
    });

    const authorizer = new apigateway.RequestAuthorizer(
      this,
      "AuthLambdaAuthorizer",
      {
        handler: authLambda.lambdaFunction,
        identitySources: [apigateway.IdentitySource.header("Authorization")],
      }
    );

    const authParams = {
      authorizer,
      authorizationType: apigateway.AuthorizationType.CUSTOM,
    };

    const user = api.root.addResource("user"); // /user

    addMethods(
      user,
      [
        { method: "GET", lambda: userLambdas.hello },
      ],
      authParams
    );
  }
}