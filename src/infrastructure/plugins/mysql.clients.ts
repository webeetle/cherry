import fp from 'fastify-plugin'
import {knex, Knex} from "knex";
import KnexConfig from '../../../knexfile'

interface KnexPluginOptions {
  "mysql.clients": Knex.Config
}

export default fp<KnexPluginOptions>(async (fastify, opts) => {
  if (Object.hasOwn(fastify, 'mysql')) {
    console.warn('mysql.adapter: mysql already exists')
    return false
  }
  const env = process.env.NODE_ENV || 'local'
  const config = opts?.["mysql.clients"] || KnexConfig[env]

  const instance = knex(config)
  fastify.decorate('mysql', instance)

  fastify.addHook('onClose', async (instance, done) => {
    await instance.mysql.destroy()
    done()
  })
}, {name: 'mysql.clients'})

declare module 'fastify' {
  export interface FastifyInstance {
    mysql: Knex;
  }
}
