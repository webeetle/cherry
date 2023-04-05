import {FastifyInstance} from "fastify";
import Server from '@habeetat/jrpc-server';

const fp = require('fastify-plugin')


export default fp(async function (fastify: FastifyInstance) {

    const server = new Server({
        name: 'cherry-server',
        version: '1.0.0',
        description: 'cherry-server',
    });

    fastify.post('/jrpc', async (request, reply) => {
        const {body} = request;
        const result = await server.executeRequest(JSON.stringify(body));
        reply.send(result);
    })

    fastify.get('/jrpc/schema/json', async (request, reply) => {
        const schema = server.getSchema();
        reply.send(schema);
    });

    fastify.decorate('jrpc', server);

}, { name: 'jrpc-server' })

declare module 'fastify' {
    export interface FastifyInstance {
      jrpc: Server;
    }
  }