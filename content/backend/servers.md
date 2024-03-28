---
title: Servers
---

Most of the work you will be doing when working on the backend is related to servers. A server's most common task is to listen to requests on a *port*, execute some task based on the incoming request, and finally return a response. This is called a *unidirectional* communication. Other servers, such as WebSockets, can receive long-running, bi-directional connections, where a client cand send many messages over the connection, and receive messages from the server, without the need for actual response. Such connections are used in chat applications for example, while unidirectional communication is the classic request-response paradigm.

> [!tip] But what other kinds of programs can I write?
>
> Good question! There's a myriad of things you can build with Node.js without servers. Command Line Interfaces or CLI's are a common type of program. You can also build [daemons](https://en.wikipedia.org/wiki/Daemon_(computing)), automation scripts, [embedded applications](https://github.com/neonious/lowjs), [parsers](https://en.wikipedia.org/wiki/Parsing), and so on.

## Port Binding

Before we can start our first server, let's discuss more about [ports](/fundamentals/the-web#ports). Ports are like a door through which messages can pass. When you create a server, you need to allow it to receive and send messages, this is done through a process called **port binding**. But let's understand this better with an example:

```js
// you'll see above how the `server` is actually created
server.listen(3000)
```

As you can see, Node.js lets us easily bind our server to a port, in this case, port 3000. You can of course choose other ports, as long as they are within the [range 0-65535](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers), and they are *not* already occupied by another server.

By default, your server is only accessible from `localhost` - as in, your computer (i.e. `http://localhost:3000`). To make your server available to the internet (assuming you have a public IP and your firewall allows outside connections), you need to set your server to listen to the `0.0.0.0` IP. This is a special IP, representing *this host*.

```js
server.listen(3000, '0.0.0.0')
```

Assuming your host (i.e. computer/machine) has an IP `3.18.29.182`, then your server will now be accessible at `http://3.18.29.182:3000`, because your server is now bound to the host network instead of `localhost`.

## A basic HTTP server

Now that we know how to connect to a server, let's create one! Node.js offers us some basic building blocks for creating servers. We will only look at HTTP servers for now, but nothing stops you from creating a low-leve [TCP](https://nodejs.org/api/net.html#class-netserver) or [UDP](https://nodejs.org/api/dgram.html). Enough talk, let's create a simple server that returns a web page as a response.

```js
// server.js
const { createServer } = require('node:http')

const server = createServer((request, response) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`
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
```

Now if you execute this file using `node server.js` you should see:

```sh
❯ node server.js
Server listening on http://localhost:3000
```

Try opening the specified URL in the browser. What do you see?

## Next steps

Here we just touched to surface. You can now continue and learn about [Requests and Responses](/backend/requests). Once that is clear, you should learn what [REST API's](/backend/rest-api) are, how they work and how to structure your API's so they are easy to use, predictible and cosnsitent. Finally, you will start using a [Database](/backend/databases), which you will then use to build a full-fledged [server API](/backend/first-backend).
