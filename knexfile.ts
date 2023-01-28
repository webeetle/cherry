import type { Knex } from "knex";
import * as dotenv from 'dotenv'
dotenv.config()

// Update with your config settings.

const KnexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'better-sqlite3',
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true
  },
};

export default KnexConfig;
