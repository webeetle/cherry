// This file contains code that we reuse between our tests.
import {FastifyInstance, fastify} from "fastify";
import AutoLoad from '@fastify/autoload';

import * as tap from 'tap';
import {join} from "path";
import {seed} from "../seeds/test_seed";

export type Test = typeof tap['Test']['prototype'];

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {
    "mysql.clients": {
      client: 'better-sqlite3',
      connection: {
        filename: "./test/test.db.sqlite",
      },
      useNullAsDefault: true
    }
  }
}

// Automatically build and tear down our instance
async function build(t: Test) {
  const app = fastify()
  // @ts-ignore
  void app.register(AutoLoad, {
    dir: join(`${__dirname}/../src/infrastructure`, 'plugins'),
    options: config(),
    // ignorePattern: !process.env.MONGO_STRING_URL ? /.*mongo.*/ : /null/
  })
  // @ts-ignore
  void app.register(AutoLoad, {
    dir: join(`${__dirname}/../src/infrastructure`, 'repositories'),
    options: config(),
  })
  // @ts-ignore
  void app.register(AutoLoad, {
    dir: join(`${__dirname}/../src/application`, 'routes'),
    options: config()
  })

  await app.ready()
  await app.mysql.migrate.latest()

  // Tear down our app after we are done
  t.teardown(async () => {
    await emptyDB(app)
    await app.close()
  })

  return app
}

async function prepareDB(fastify: FastifyInstance) {
  await seed(fastify.mysql)
}

async function emptyDB(fastify: FastifyInstance) {
  await fastify.mysql('todo').del()
}


export {
  build,
  prepareDB,
  emptyDB
}
