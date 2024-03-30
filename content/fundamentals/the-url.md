---
title: Understanding the URL
---

The [Uniform Resource Locator](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL), otherwise known as the URL, is one of the most fundamental concepts one needs to know when working on the [Web](/fundamentals/the-web).

A most basic URL is `https://google.com`. Probably everyone on the planet has seen this URL. But let's explain briefly how it works, because this basic URL does not contain all the possible components of a URL.

## The basic components

Let's take a look at a more complete example of a URL you will usually see in the wild:

```lua
https://google.com/search?query=volvo#result_2
^1      ^2         ^3     ^4         ^5
```

### 1. `scheme`

It represents the communication protocol of the URL. You'll mostly see `https` or `http` in a browser, but a URL is used for other purposes as well. For example, a connection string for a PostgreSQL database will use the `postgresql` protocol, a Git URL will use the `git` protocol, and so on.

### 2. `authority`

Can be composed of 2 components, the `host` (i.e. `google.com`) and optionally a `port`. As mentioned in [The Web](/fundamentals/the-web), the default port for `https` is 443, so in this case it can be omitted. If the service you want to connect to uses a different port, you can write the URL as `https://google.com:1234/...`.

### 3. `path`

It is represented by a sequence of zero or more text segments separated by a slash (/) character. The path can be empty (e.g. `https://google.com`) or it can contain one or more other segments (e.g. `https://google.com/my/many/path/segments`). The path usually represents the location of a resource. So for example if we want to see the projects of a user, we might write a path like `/users/john/projects`. We'll talk more about organizing paths in [REST API's](/backend/rest-api). We usually call a path `/` as the root of the website.

### 4. `query`

While optional, and it always comes after the path and begins with a question mark `?`. Query parameters are non-hierarchical, and are most commonly used as an easy way to control search filters (e.g. on e-commerce websites or search engines) or store some basic configuration for use on the page. Query parameters are [key-value pairs](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair) that are separated by an `&` characters, such as `?last_name=doe&age=24`.

### 5. `hash`

Also known as a `fragment`, it's also optional, it's usually a reference to a sub-resource (or anchor) on the page. For example, if an element on the page has an ID `id="avatar"` and the URL contains a hash `...#avatar` then the browser will automatically scroll to that element. You can use this URL as a more complete example `https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL#anchor` (notice where on the page you landed).

> [!note] Username and passwords
> 
> A URL can optionall contain a username and a password afther the scheme delimiter (`://`). You will see this pattern most often when using connection strings for databases. You can notice in the following connection string `postgresql://user:password@127.0.0.1:5273/db-name` how the username is delimited from the password by a colon `:`, and also how the the authority is delimited from the credentials using a `@` sign.

## URI's and examples

The URL is a type of URI (Uniform Resource Identifier). As such, all rules above also apply to URI's, however less components are required to form a basic URI. The following examples are provided [on Wikipedi](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Example_URIs), and you'll see many of them spread around on the internet.

```powershell
        userinfo       host      port
        ┌──┴───┐ ┌──────┴──────┐ ┌┴┐
https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top
└─┬─┘   └─────────────┬────────────┘└───────┬───────┘ └────────────┬────────────┘ └┬┘
scheme          authority                  path                  query           fragment

ldap://[2001:db8::7]/c=GB?objectClass?one
└┬─┘   └─────┬─────┘└─┬─┘ └──────┬──────┘
scheme   authority   path      query

mailto:John.Doe@example.com
└─┬──┘ └────┬─────────────┘
scheme     path

news:comp.infosystems.www.servers.unix
└┬─┘ └─────────────┬─────────────────┘
scheme            path

tel:+1-816-555-1212
└┬┘ └──────┬──────┘
scheme    path

telnet://192.0.2.16:80/
└─┬──┘   └─────┬─────┘│
scheme     authority  path

urn:oasis:names:specification:docbook:dtd:xml:4.1.2
└┬┘ └──────────────────────┬──────────────────────┘
scheme                    path
```

## Relative and Absolute URLs

As their name implies, URL's can either be relative to the current page you are on, or absolute, which means that the URL is the actual destination you will reach when accessed.

A **relative** URL represents the path of the resource relative to the current path. Let's say you have navigated to a URL `https://acme.corm/projects`:
- To navigate to the root using a relative URL you would need to click a link like `<a href="../" />`
- To navigate to another page located one level below the root you would need a URL such as `<href="../services" />`
- To navigate to a sub-page, you need a URL `<a href="./all" />` or `<a href="all" />`

An **absolute** URL is the actual destination and does not care about the current page you are on.
- To navigate to another page on the current website you can either:
  - Use the full website URL `https://acme.corp/services` or,
  - Use the absolute path of the page `/services`. Note that this is different than a relative URL!
- To navigate to a whole different website you need the full URL to that website.

> [!note] Where would I use these?
> 
> Anywhere where a URL is needed on the webpage. For example, `<img src="..." />`, `<video src="..." />`, `<script src="..." />` and so on. The browser will always respect the type of URL.
