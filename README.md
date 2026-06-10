# create-express-mongodb-ts-starter

A CLI tool to scaffold a ready-to-use Express + MongoDB + TypeScript application in seconds.

## Quick Start

```bash
# npm
npx create-express-mongodb-ts-starter my-app

# yarn
yarn create express-mongodb-ts-starter my-app

# pnpm
pnpm create express-mongodb-ts-starter my-app

# bun
bun create express-mongodb-ts-starter my-app
```

Then install dependencies and start the dev server:

```bash
cd my-app
npm install     # or: yarn install / pnpm install / bun install
npm run dev     # or: yarn dev / pnpm dev / bun dev
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
npm run dev     # or: yarn dev / pnpm dev / bun dev
npm run build   # or: yarn build / pnpm build / bun build
npm start       # or: yarn start / pnpm start / bun start
npm run lint    # or: yarn lint / pnpm lint / bun lint
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