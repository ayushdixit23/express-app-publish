# create-express-mongodb-ts-starter

A CLI tool to scaffold a ready-to-use Express + MongoDB + TypeScript application in seconds.

## Quick Start

```bash
npx create-express-mongodb-ts-starter my-app
cd my-app
npm run dev
```

Or use npm create:

```bash
npm create express-mongodb-ts-starter my-app
```

## What You Get

A fully-structured Express app with:

### Tech Stack
- **Express 5.x** - Web framework
- **MongoDB + Mongoose 8.x** - Database
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Swagger/OpenAPI** - API documentation
- **Pino** - Fast logging
- **ESLint + Prettier** - Code quality

### Project Structure

```
my-app/
├── src/
│   ├── config/              # env, database, middlewares
│   │   ├── database.ts      # MongoDB connection
│   │   ├── env.ts          # Environment variables
│   │   └── middlewares/   # cors, security, rateLimit
│   ├── controllers/        # Route handlers
│   ├── core/
│   │   ├── errors/        # AppError, errorCodes
│   │   ├── responses/     # ApiResponse, SuccessResponse
│   │   └── validation/    # Zod schemas
│   ├── middlewares/        # Request middleware
│   ├── routes/            # Express routes
│   ├── services/        # Business logic
│   ├── types/            # TypeScript types
│   ├── utils/            # Logger, graceful shutdown
│   ├── app.ts            # Express app factory
│   └── index.ts         # Entry point
├── package.json
├── tsconfig.json
├── env.example
└── eslint.config.js
```

### Features Built-in

- **Security**: Helmet, CORS, Rate limiting, Input sanitization
- **Validation**: Request body validation with Zod
- **Error Handling**: Custom errors, error codes, proper HTTP responses
- **Logging**: Request/response logging with Pino
- **API Docs**: Swagger UI at `/api/docs`
- **Health Check**: Route at `/health`
- **Graceful Shutdown**: Clean process termination

## Commands

```bash
npm run dev      # Development server (with nodemon)
npm run build   # Compile TypeScript
npm start       # Production server
npm run lint   # ESLint check
```

## Environment Variables

Copy `.env.example` to `.env`:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/express-app
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## License

MIT