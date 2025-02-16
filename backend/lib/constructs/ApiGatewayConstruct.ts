import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { AuthLambdaConstruct } from "./AuthLambdaConstruct";
import { addMethods } from "./helpers/addMethods";

export class ApiGatewayConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { userLambdas, calendarEventLambdas, userPoolId }: any
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

    // User Routes
    const user = api.root.addResource("user"); // /user
    const listUsers = user.addResource("list"); // /user/list
    const userById = user.addResource("{userId}"); // /user/{userId}

    // Event Routes
    const event = api.root.addResource("event"); // /event
    const eventById = event.addResource("{eventId}"); // /event/{eventId}

    // Host Invite Routes
    const hostInvite = api.root
      .addResource("host_invite")
      .addResource("{eventId}"); // /host_invite/{eventId}

    // Guest Invite Routes
    const guestInvite = api.root.addResource("guest_invite"); // /guest_invite
    const guestInviteByid = guestInvite.addResource("{guestInviteId}"); // /guest_invite/{guestInviteId}

    addMethods(
      user,
      [{ method: "GET", lambda: userLambdas.hello }],
      authParams
    );

    addMethods(
      userById,
      [{ method: "GET", lambda: userLambdas.getUserById }],
      authParams
    );

    addMethods(
      listUsers,
      [{ method: "GET", lambda: userLambdas.listUsers }],
      authParams
    );

    addMethods(
      event,
      [
        { method: "GET", lambda: calendarEventLambdas.listCalendarEvents },
        { method: "POST", lambda: calendarEventLambdas.createCalendarEvent },
      ],
      authParams
    );
  }
}
