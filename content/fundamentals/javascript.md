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

## Running JavaScript on the server

<!-- reference nodejs installment, talk about REPL and running a script -->