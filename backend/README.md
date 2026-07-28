# express template

## About

This template contains express-session, passport-local and ejs packages.

## How to use it

After clone this repo, run `npm run install && npx prisma generate`.

## Express-session package

By default, it exports a function that returns a middleware called `session`.
Roughly, the `session` middleware does the following:

- If there is no session id in cookie, call `generate` method.
- If exists, call `store.get`, of which callback calls `inflate` method

Eventually, `new Session` and `new Cookie` objects are created in both cases. The differences are:

- `generate` method generates `sessionID`
- `store.get` method reads session data from its storage (e.g. `PrismaSessionStore` or `connect-pg-simple`) using `sessionID`, and passes this data to `inflate` method via its callback. `inflate` method then reconstructs new `Session` and `Cookie` objects with that data.

In this template, the `session` middleware is used globally:

```js
...
app.use(session)
...
```

## Packages

```
├── express
├── @types/express
├── express-validator
├── express-session
├── @types/express-session
├── express-flash
├── @types/express-flash

├── ejs
├── @types/ejs
├── ejs-lint

├── eslint
├── @eslint/js
├── typescript-eslint

├── passport
├── @types/passport
├── passport-local
├── @types/passport-local


├── prisma
├── @prisma/adapter-pg
├── @prisma/client
├── @quixo3/prisma-session-store
├── pg
├── @types/pg

├── typescript
├── @types/node
├── tsx

├── supertest
├── @types/supertest
├── vitest

├── bcryptjs
└── dotenv

```
