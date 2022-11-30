import {FastifyInstance} from "fastify";
import cors from '@fastify/cors'

const fp = require('fastify-plugin')

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(cors, {
    origin: '*',
    methods: ['HEAD', 'OPTIONS', 'POST', 'GET', 'PUT', 'DELETE']
  })
}, { name: 'cors' })