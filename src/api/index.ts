import fastify from 'fastify'
import routes from './routes/routes'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { swaggerGlobalOptions } from './infra/swagger'

const app = fastify({ logger: true, disableRequestLogging: true })

app.register(swagger, swaggerGlobalOptions)
app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.ready((err) => {
  if (err) throw err
  app.swagger()
})

routes.forEach((route) => app.register(route))

app.register(cors, {
  origin: 'http://localhost:3333',
})

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`Server is listening on port: ${address}`)
})

export default app
