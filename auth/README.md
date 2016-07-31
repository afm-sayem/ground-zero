### Authentication Flow

- Configure email. Define these values in your `.env` or in your environment variable: `SMTP_CONNECTION`,  `REDIS_URL`, `REGISTRATION_EMAIL` and `SUPPORT_EMAIL`. Checkout (Mailgun)[http://mailgun.com] for free transactional email for your domain.
- Send `POST` request to `auth/signup` with `email` and `password` in request body(json).
- The user's passwords hash and email gets stored in redis for 48 hours. A link with validity upto 48 hours is sent to the users email.
- When the user verifies her account by clicking the link in the email, A user is created with her credentials.
- To login, a user has to send `email`, and `password`. A token is generated using the users and sent back to the user.
- The user can authenticate herself using the token in the `Authentication` header, the value format being, `Bearer <token>`
