import type { Knex } from "knex";
import * as dotenv from 'dotenv'
dotenv.config()

// Update with your config settings.

const KnexConfig: { [key: string]: Knex.Config } = {
  local: {
    client: 'better-sqlite3',
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true
  }
};

export default KnexConfig;
