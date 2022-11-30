# Cherry 🍒

This project was born to be a scaffold for a new Node REST microservice. It is a simple project that uses the following technologies / tools / architectures:

- Hexagonal Architecture Ready 🏛
- Typescript 🔒
- Fastify ⏩
- OpenAPI docs ready 📖
- SQLite3 with Knex 🔧
- Tap for tests 🧪

## How to install

- Clone this repository
- Run `npm install` for install all dependencies
- Run `npm run db:init` for create the database
- Run `npm run dev` for start the server in development mode
- Have fun 🎉

## Commands available

- Run `npm run dev` to start the server in development mode
- Run `npm run start` to start the project in production mode
- Run `npm run test` to run the tests
- Run `npm run build` to build the project
- Run `npm run db:init` to reset or create the database
- Run `npm run db:migrate:latest` to run the latest migrations
- Run `npm run db:migrate:reset` to rollback all the migrations

## Using Fastify

Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know, it is one of the fastest web frameworks in town. Check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

## Using Knex

Knex is a SQL query builder that can be used to build queries for different databases. It is used in this project to build queries for SQLite3 but it can be used for other SQL databases as well. To learn more about Knex, check out the [Knex documentation](http://knexjs.org/).

### Migration

To folders `migrations` and `seeds` are used to create the database and populate it with data. See the [Knex documentation](http://knexjs.org/) for more information.

## Using Tap

Tap is a test framework for Node.js. It is used in this project to run the tests. To learn more about Tap, check out the [Tap documentation](https://node-tap.org/).