import fastify from 'fastify'

const server = fastify()

server.get('/ping', async () => {
  return 'ping'
})

server.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
