import { createServer } from 'node:http'

const server = createServer((request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/html')
  response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My web page</title>
    </head>
    <body>
      Hello world
    </body>
    </html>
  `)
})

server.listen(3000, 'localhost', () => {
  console.log(`Server listening on http://localhost:3000`)
})
