import { FastifyRegisterOptions } from 'fastify'
import { SwaggerOptions } from '@fastify/swagger'

export const swaggerGlobalOptions: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  swagger: {
    info: {
      title: 'Sports ERP API - Documentation',
      description: 'Sports ERP API - Documentation',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Tenants', description: 'Tenants related end-points' },
      { name: 'Plans', description: 'Plans related end-points' },
      { name: 'Users', description: 'Users related end-points' },
    ],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
}
