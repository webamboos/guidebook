---
title: JavaScript
---

JavaScript (formally known as [ECMAScript](https://262.ecma-international.org/14.0/)) is the programming language of the web. While the browser is mostly capable of handling all kinds of use-cases and scenarios, the default user experience is often lacking and users always want the best UX possible. That's where JavaScript comes in.

JavaScript was initially designed to bring interactivity to the web, specifically in the **browser/client** (this is an important term). Nowadays, JavaScript can also be used on the **server** (again, important) through [NodeJS](/backend/nodejs) (put down your pitchforks, we know, there are others like [Bun](https://bun.sh/), [Deno](https://deno.com/), [WinterJS](https://github.com/bellard/quickjs), who can count them all? Node is still the most popular).

> [!warning] Server and Browser Javascript
>
> It's important to be aware of the differences between browser and server JavaScript. For example, the browser does not have access to the file system or to the USB ports of your computer, while NodeJS has. There are libraries that work on either the server, the browser, or sometimes both, depending on what they need to do. Still, you'll want to keep this piece of information in mind.

## Running JavaScript in the browser

There are two main ways you can run JavaScript (JS) in the browser. One is by directly writing JS in your HTML inside a `<script>` tag, and the other is by linking a JS file hosted on your [web server](/frontend/web-servers).

### Using a `script` tag

The simples way to run some JavaScript on your page is to put the [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) somewhere on your page, either inside the `<head>` tag or the `<body>` tag. Head tags are evaluated first by browsers, so if you want your script to run before anything is rendered on the page, that's your spot.

```html
<script>
  console.log("Hello world!")
</script>
```

### Linking a JS resource file

This is the most common practice you see on the web today, especially in web frameworks such as React, Vue, Angular, etc. Most (if not all) of the JavaScript in your project will be joined into a single file (with exceptions, but that's out of scope) that is then *referenced* inside the `<head>` part of your webpage.

```html
<head>
  <script type="text/javascript" src="/script.js"></script>
</head>
```

You can, of course, link as many JavaScript files as you want, and they will all load based on the different [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attributes) of a script tag. It's also important to note that the `src` attribute respects [relative & absolute URLs](/fundamentals/the-url#Relative-and-Absolute-URLs), so you may want to play with the different types of URLs to see how the browser behaves.

### The Browser Console

A quick and easy way to run JavaScript is using the browser console. You can press <kbd>F12</kbd> on any web page or `Right Click + Inspect` and the [DevTools panel](/frontend/browser-devtools) will pop up. You will notice a few tabs at the top, the `Console` being what you are looking for.

You can run any JavaScript there, one command at a time. The Console is a useful tool to debug issues in your page quickly. For example, you might be wondering why a button emits an event (or doesn't), so you can easily add temporary events, styles, elements, and so on. When you're dine, all changes will be gone when you refresh the page.

## Running JavaScript on the server

After you have installed [NodeJS](/backend/nodejs), you can run server-side JavaScript either by creating a `.js` script file that contains your code, or through the REPL.

### REPL

The REPL ([read-eval-print loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) is an interactive "shell", similar to the browser console, where you can execute code line by line.

To access the Node REPL you just need to type `node` in your [terminal](/fundamentals/the-terminal). The output will look like:

```sh
Welcome to Node.js v20.11.1.
Type ".help" for more information.
> 
```

Now you can type any NodeJS command and hit <kbd>Enter</kbd> to execute it. To exit the REPL you can write `.exit` or hit <kbd>Ctrl/Cmd + C</kbd> twice.

> [!tip] Exercise!
> 
> Try writing some text into a file using the REPL. Hint: you can use variables in the REPL just like you would use in a normal JavaScript program.

### Writing scripts

A JS script is just a text file that ends in `.js` (or `.mjs` or `.cjs` but you don't need to worry [about that](https://www.hoeser.dev/blog/2023-02-21-cjs-vs-esm/) for now). Once you have created a script file, you can run it using the `node` command in your terminal.

```js
// myscript.js

console.log('Hello world')
```

To execute the above script you just need to run `node myscript.js`.

> [!tip] Exercise!
> 
> Just like the previous excercise, try writing to a file using a script.
