import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export default fp(async (fastify) => {
  // @ts-ignore
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Mio Catalog API',
        description: '',
        version: '0.0.1'
      },
      host: process.env.OPENAPI_HOST,
      basePath: process.env.OPENAPI_BASE_URL,
      schemes: ['https', 'http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [],
      securityDefinitions: {
        Bearer: {
          in: 'header',
          type: 'apiKey',
          name: 'Authorization',
          description: 'Submit value "Bearer $token", then execute the Introspection request.'
        }
      }
    }
  })

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    staticCSP: true,
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
      filter: true,
    }
  })
}, {name: 'swagger'})
