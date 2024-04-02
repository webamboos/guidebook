---
title: Building a Frontend
---

As a continuation of the [Backend](/backend/building-a-backend) project, you will now be tasked to build an accompanying web client application. This application will serve as the user interface, where people can create an account and manage their home libraries.

## Background

Jimmy and his friends need a simple way to manage they home libraries. They want to add homes, update them and search them easily. They also want to see a map of all the homes they added, so it'll be easy for them to see where they are on the map, and what other points of interest are in the area.

You will need to build a simple web application that meets this requirement. It can look however you want, but it's important to fulfill their needs, and it needs to be quick to respond.

### The UI

You can build the UI using whatever frontend library you choose, but for a start we'll give you some ideas if you are using React or Vue. Your application can be [client rendered (i.e. SPA)](/frontend/rendering#SPA) or [server-rendered](/frontend/rendering#SSR). Whichever you choose will bring different advantages. Here are some recommendations for libraries and tools you can use:

1. **Vue** - [Vite.js (SPA)](https://vuejs.org/guide/quick-start.html) or [Nuxt (SSR)](https://nuxt.com/)
2. **React** - [Vite.js (SPA)](https://vitejs.dev/guide/#scaffolding-your-first-vite-project), [Remix (SSR)](https://remix.run/) or [Next (SSR)](https://nextjs.org/)
3. **General**
   - [@tanstack/query](https://tanstack.com/query/v5/docs/framework/vue/overview) for advanced state management, caching of API responses and more
   - [TailwindCSS](https://tailwindcss.com) for styling

When building the user interface it's important to think about many other things apart from logic and API requests. You want to make sure the interactions are intuitive, that buttons, inputs and the copywrite makes sense and it's understandable. You want to tell the user when something is happening, for example through a loading spinner when a request is in progress. You also want to tell the user when an error occured. So make sure to keep all of these topics in mind when constructing your application. You can also find [many other resources](https://github.com/codingknite/frontend-development) on the web to help you.

> [!tip] Checklist
>
> - [ ] Create a register & login UI
> - [ ] Use a Map library to show the world map for the home library. You can use [MaplibreGL](https://maplibre.org/) together with [Maptiler](https://www.maptiler.com/) for the map visuals.
> - [ ] Build a way to create, edit and delete homes and labels.
> - [ ] Build a system to search homes and view them on the map.
> - [ ] Build accessibility and responsiveness into the application.

## Getting started

Now that you have a general overview of what needs to be done, you can get started by creating a `git` repository in your local computer and start writing code! A good approach when building applications with multiple components (i.e. separate backend and frontend) is to use [monorepos](/advanced/monorepos).

> [!tip] Take notes
>
> Make sure you take notes of the process! For example, write down what patterns you used an why, what database and why, what libraries, what external API, what was hard, what was easy, any gotchas or interesting errors. Note everything down! Later, you might start your own blog too.