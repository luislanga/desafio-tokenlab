# Backend: tokenlab-calendar

## CDK Structure

The AWS infrastructure is defined in `backend/lib/backend-stack.ts`. It includes:

- API Gateway
- Lambda definitions and integrations
- DynamoDB
- Cognito User Pool

#### API Endpoints

All endpoints are protected by a custom Lambda Authorizer function which checks the JWT in 'Bearer Token' form from the request.

_Note: Some provisioned routes were not implemented given the time constraints. The current active routes are listed in the table below._

| Endpoint         | Method | Request Payload                                                                                                                     | Description                                 |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| /user/{userId}   | GET    | -                                                                                                                                   | Fetches the user info from the database.    |
| /user/listUsers  | GET    | -                                                                                                                                   | Lists all users from database.              |
| /event           | GET    | -                                                                                                                                   | Fetches all events from user (ID from JWT). |
| /event           | POST   | `{ "calendarEventDescription": "Event Description", "startDate": "10000000", "endDate": "101000000", "guests": [] }`                | Creates an event for the user.              |
| /event/{eventId} | GET    | -                                                                                                                                   | Fetches a specific event                    |
| /event/{eventId} | PUT    | `{ "calendarEventDescription": "Event Description", "startDate": "10000000", "endDate": "101000000", "guests": [] }` (all optional) | Updates a specific event                    |
| /event/{eventId} | DELETE | -                                                                                                                                   | Deletes a specific event                    |

#### Database Schema (DynamoDB)

| Entity | PK          | SK            | GSI1PK      | GSI1SK               | Attributes                                                              |
| ------ | ----------- | ------------- | ----------- | -------------------- | ----------------------------------------------------------------------- |
| User   | USER#       | USER#userid   | -           | -                    | userId, username                                                        |
| Event  | USER#userid | EVENT#eventid | USER#userid | EVENT#DATE#startdate | eventId, hostId, description, startDate, endDate, hasGuests, isCanceled |
