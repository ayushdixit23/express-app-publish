# create-express-mongodb-ts-starter

Scaffold a new Express + MongoDB + TypeScript project with a single command.

## Usage

```bash
npx create-express-mongodb-ts-starter my-app
```

Or using npm create:

```bash
npm create express-mongodb-ts-starter my-app
```

## Features

- Express 5.x with TypeScript
- MongoDB via Mongoose 8.x
- Zod 4.x for request validation
- Swagger/OpenAPI documentation
- Security middleware (Helmet, CORS, Rate Limiting)
- Error handling with custom error codes
- Request logging with Pino
- Graceful shutdown

## What You Get

```
my-app/
├── src/
│   ├── config/         # env, database, middlewares
│   ├── controllers/    # route handlers
│   ├── core/errors/    # AppError, errorCodes
│   ├── core/responses/ # ApiResponse, SuccessResponse
│   ├── core/validation/schemas/ # Zod schemas
│   ├── middlewares/    # validation, sanitize, security
│   ├── routes/         # Express routes
│   ├── services/       # business logic
│   ├── utils/          # logger, graceful shutdown
│   ├── app.ts          # Express app factory
│   └── index.ts        # Entry point
├── package.json
├── tsconfig.json
├── env.example
└── ...
```

## Commands

```bash
npm run dev    # Development server
npm run build  # TypeScript build
npm start      # Production server
```

## License

MIT