A request is sent to `/auth/signup` for users wanting to register with the service. A mail is sent to the users email address and when the user verifies that link, the user is created in the database.

Authentication is token based. Upon login request with username and password at `/auth/login`, a time limited token containing user identification. The client is expected to send the token in it's authentication header in requests that require authentication.
