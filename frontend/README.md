# Frontend: tokenlab-calendar

## Authentication Flow
1. User logs in via Cognito (OIDC).

2. Cognito redirects user back to frontend page and creates an auth provider.

3. In each request the ID token from OIDC's auth provider is passed as a bearer token in the Authorization headers for Cognito validation in the backend.

## State Management
React Query is used to fetch, cache, and update event data efficiently. API calls are handled in `frontend/src/api.ts` and all query hooks are located in `frontend/hooks`.