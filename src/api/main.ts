import fastify from 'fastify'
import routes from './routes/routes'

const app = fastify()

routes.forEach((route) => app.register(route))

app.get('/ping', async () => {
  return 'ping'
})

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

export default app
