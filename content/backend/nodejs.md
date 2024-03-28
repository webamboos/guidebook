---
title: Node.js
---

From their website, [Node.js](https://nodejs.org/en) is "a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts". In laymans terms, Node.js is a way to run JavaScript outside of the browser.

![The Node documentary](https://www.youtube.com/watch?v=LB8KwiiUGy0)

## Installing Node.js

There are several ways to install Node.js onto your system, but we'll focus on one in particular. Often times when you jump into another project you find yourself needing a different version of either Node, or of another dependency related to Node or package management. Updating Node is easy, but once you update it, you might find yourself in an uncomfortable position where another project breaks because of some changes in the new Node version.

### nvm

To install Node, we recommend using `nvm`, also known as the [Node Version Manager](https://github.com/nvm-sh/nvm). If you are using Windows, you can use [this project](https://github.com/coreybutler/nvm-windows), but we'll keep it simple and only talk about Unix systems. You can (and should) install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) on your Windows machine and use that. If you haven't, you should also read about [the terminal](/fundamentals/the-terminal).

If you follow the [installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install) **carefully**, you'll have a working version of nvm on your machine. Once you open a new shell, you should be able to execute:

```sh
nvm ls-remote
```

This command will show you the list of available Node versions that you can install. If unsure, you should intall the LTS (Long-Term Support) version, because it's the one most likely to be with the fewest problems. If your project requires a specific Node version, install that. A respectable project will contain an `.nvmrc` file inside it's repository, or an `engines` object inside the `package.json` file. If neither are available, assume LTS is the one to install.

```sh
# to install latest
nvm install lts
# to install a specific version
nvm install 16.19
```

Once you have installed your desired Node version, you can enable it:

```sh
nvm use 20 # will default to using the latest Node 20 version installed
```

Now, you should be able to run `node -v` and it should output the correct Node version. Finally, it's recommened to set a default Node version to use, so that whenever you want to run Node you are sure it's loaded in the shell correctly.

```sh
nvm alias default {version}
```

You can also create other aliases, for example by project name, but that's up to you.

## What is an event?

We won't go into too much detail of writing actual Node.js code, you should follow other online courses for that, like [The Odin Project](https://www.theodinproject.com/), but we will however go into the fundamentals of how Node works. Once you understand the fundamentals, you will understand anything.

Node.js is an asynchronous, event-driven runtime. This will probably be harder to grasp at first, but in Node the code you write will not always run in the exact sequence you intended it to, but at *some point* in response to an event. Let's take the next piece of code as an example.

```js
console.log('1')
setTimeout(() => {
  console.log('2')
}, 1000)
console.log('3')
```

Intuition would suggest that the code above will print `1`, `2` and `3`, where `2` will be printed 1000 miliseconds after `1`, and `3` will be printed immediately after `2`. However that intuition would be wrong. By that intuition, we would call our code **synchronous**, but it's not.

### The Event Loop

Node.js is single-threaded by design. What that means is your code runs on only a single CPU thread, and each instruction is handled one after the other. "But wait", you might say, "then why isn't the code above executing as our intuition would say?". Padawan, that's where the [Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) comes in.

Node.js is fast because it can offload I/O operations the operating system (specifically through [libuv](https://libuv.org/)). By doing so, Node.js can spend time computing other things, such as receiving requests, computing some mathematics or parsing data.

> [!tip] What are I/O operations?
>
> I/O stands for Input/Output. A lot of the operations you do on a day-to-day basis that can take time involve requests to other services or reading or writing files. These tasks can be handled by the operating system, which is much more efficient in utilizing your CPU's threads. Other programming languages, such as Java, let you manage threads and concurrency, while Node.js leaves it to the operating system (that doesn't mean you can't spawn new threads in Node). There are advantages and disadvantages to both approaches.

This "off-loading" process is done through an Event Loop. You should watch the following video to understand it better, but long-story-short, any **asynchronous** tasks (e.g. reading files) are queued up, and while these tasks are waiting to be completed, Node.js can do other tasks. Once a file is read, Node.js gets a notification about the status, and lets your code run again normally.

!(Video about The Event Loop)[https://www.youtube.com/watch?v=cCOL7MC4Pl0]

### Callbacks

Callbacks are the most basic building blocks of asynchronous computing. A callback is a way of saying "tell me when this is done, meanwhile I'll do something else". The example above is the most basic example of a callback and the event loop. Let's look at it again.

```js
console.log('1')
setTimeout(() => {
  console.log('2')
}, 1000)
console.log('3')
```

`setTimeout` is a function that receives 2 arguments. The first argument is a **callback function**, and the second argument is a number, representing the amount of time, in miliseconds, after which the **callback** should be **called**. Let's rewrite it so you can see what's happening better.

```js
// declare my callback function
function myCallback() {
  console.log('2')
}

console.log('1')

// pass my callback function as a _reference_ to setTimeout.
setTimeout(myCallback, 1000)

console.log('3')
```

I hope you can now see better what's happening. Simply put, `myCallback` will be put into the event loop, while the other two `console.log`'s execute synchronously. Meanwhile, a second passes, and finally the event loop will call back the callback (lots of call-backs), printing the `2`.

### Promises

In earlier days, you could only use callbacks to execute code after some asynchronous operation ended. We used to call that "callback hell", because of all the nested functions that needed to be chained in order to run multiple async tasks in succession.

```js
let users

getWorkspace((workspace) => {
  getWorkspaceMembers(workspace, (members) => {
    users = members

    // do other operations with users
  })
})

// *
```

As you can see, using callbacks you need to nest function calls in order to get the desired results from some external requests, such as requests to a database. You could make it prettier:

```js
let users

getWorkspace(handleWorkspace)

function handleWorkspace(workspace) {
  getWorkspaceMembers(handlerWorkspaceMembers)
}

function handlerWorkspaceMembers(members) {
  users = members
  // do things with users
}
```

But this further makes your code sometimes more complicated to read, because you always need to remember which function executes after which, and no amount of rearranging makes it better.

This problem prompted to the creation of [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)! As it's name suggests, a Promise is, well, a *promise* that some data will be available *at some point* in the future.

Let's see how our `getWorkspace` function would look like if it were a Promise.

```js
const getWorkspace = new Promise((resolve, reject) => {
  // here we do an SQL query to a hypothetic database using the `pg` library
  // https://node-postgres.com/
  db.query('select * from workspaces', [], (data, error) => {
    // callbacks usually return a tuple (https://www.techtarget.com/whatis/definition/tuple)
    // of `data` or `error`, where only one of them contains data at any given time.
    if(error) reject(error)
    resolve(data)
  })
})
```

As you can see, a Promise is still a callback, however it's special. A promises receives a single argument and that is a function that has two parameters: `resolve` and `reject`. These two parameters are also functions. You call `resolve` when your code successfully executes and pass it the result as an argument `resolve(users)`. If your code encounters an error, you call the `reject` function, and, optionally you can pass an argument which contains the error `reject(error)`.

With this example out of the way, let's assume we have rewritten all of our async operations as promises. We can now rewrite our initial callback example in the promisified form like:

```js
const users = getWorspace
  .then(getWorkspaceMembers)
  .catch((error) => {
    // handle error
  })
```

As you can see, our code is much simpler. We are still using callbacks, but we are now officially out of "callback hell". These are called "thenables", because you can chain them as much as you want!

But wait, there is an even simpler way of writing promises! "*Why didn't you start with that!?*" [This is why](/mindset/why).

The simplest way of working with Promises is with the use of `async/await`. We call this "syntactic sugar", a simpler way of writing code, but sometimes at a small performance hit, however we won't get into those details. Let's see how it looks.

```js
// this works with the promisified versions from above
const workspace = await getWorkspace()
const users = await getWorkspaceMembers()
// do things with users
```

Now this is much cleaner! As you can see, you use `await` whenever you want to *wait* for a Promise to execute and "resolve". You receive the resolved value as a classic function return. You can also omit the usage of the `Promise` constructor altogether. Assuming the libraries you work with provide promisifed methods, you can easily use an `async` function.

```js
async function getWorkspace() {
  const result = await db.query(...)
  return result
}
// or, if you don't need to modify the query result
async function getWorkspace() {
  return db.query(...)
}
```

Again, this is syntactic sugar, what we did here is the same thing as above, just callback-less. Behind the scenes, `db.query` still uses `Promise` and possibly classic callbacks too, but all of that complexity is abstracted away so you can build applications easily, without worrying about complex callback chains.

Finally, this chapter won't be complete without talking about errors! As you can probably notice, errors are nowhere to be found in the `async/await` examples, that's because errors are thrown, and they exit the classic execution chain of your code. If the `db.query()` call errors, the execution of our code will never even reach the `result` asignation. As a result, we can `catch` errors in two ways:

```js
// first way, as you can see you can use thenables together with async/await!
const result = await getWorkspace().catch(error => { /* handle error */ })

// second way, sometimes unpreferable because of the nesting
try {
  const result = await getWorkspace()
} catch (error) {
  // handle error
}
```

## Conclusion & next steps

Hope you were able to follow up to here and you have a better understanding of how Node works. While this is just touching the surface, you will need to go deeper. That's why we'll give you some good resources to learn more, and some excercises to build your understanding.

- [The Node.js Docs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) - Highly recommended
- [Art of Node](https://github.com/max-mapper/art-of-node)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [The Odin Project](https://www.theodinproject.com/)
- [FreeCodeCamp](https://www.freecodecamp.org/)
- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)

### Excercises

**Block the event loop** - Try building a program that intentionally blocks the event-loop. Write down why your code blocks the event loop. Provide an example of the same code that does not block the event loop.

**A `wait()` function** - `setTimeout` does not actually stop the execution of your code, but what if you wanted to pause for 5 seconds? Try writing a promisified version of setTimeout but which actually waits for the timeout to finish before executing other code.

**Event Emitters and Files** - Create a file that contains a random number on each line. Now write a script and using the `EventEmmiter` class in Node.js create a simple event listener that can respond to two events `even` or `odd`.  Your script will read the file line by line and emits events based on the number read on that line. If the number is odd, you will emit an event called `odd`, otherwise you emit an event `even`. The `even` event listener will run the `wait()` function above for 1 second then log the number, while the `odd` listener will only log the number. You can use the [Node.js documentation](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter) as a starting point.