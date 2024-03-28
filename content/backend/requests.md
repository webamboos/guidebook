---
title: Requests & Responses
---

To communicate over an HTTP connection you send a Request, that is then greeted with a Response. Just like in a restaurant, you ask the waiter for food, and at some point you receive it. 

The HTTP protocol defines clear ways on how Requests and Respones need to be structured. In the following sections we'll learn all the basic concepts. Let's first take a look at an example Request:

```yml
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

As you can see, an HTTP Request is just some text. The first line always contains the **method** (`GET`), **path**(`/`) and **protocol**(`HTTP/1.1`). The following lines contain **Headers**, which are key-value pairs separated by a colon. The `Host` header contains a domain name or an IP. Other headers offer more context about the nature of the request.

A response is similar in structure:

```
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 155
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    <p>Hello World, this is a very simple HTML document.</p>
  </body>
</html>
```

In this example, the responses' first line contains the protocol, followed by a status code (`200`) and the status code message (`OK`). The following lines contain the response headers, and finally we can notice the **body**, which in this case contains an HTML page.

## Methods

A request always contains a **method**. Methods are well defined and should signify what the request should do.

- `GET`: as the name implies, a GET request requests data, without modifying content on the server. GET requests *don't* have a body.
- `POST`: a POST request usually signifies the insertion of some data
- `PUT`: similar to a POST request, PUT *replaces* data, however in some cases it can also create new data. This is usually used for updating some data in the database.
- `PATCH`: a PATCH can be similar to a PUT, but instead of replacing data, a PATCH just updates whatever has changed.
- `DELETE`: self-explanatory.
- `HEAD`, `OPTIONS`: these are methods that are used by the browser to determine whether further requests can happen and how. You usually don't send HEAD or OPTIONS requests by hand, but it's important to know they exist.

It's true that methods are a convention, and you will often see API's that are implemented poorly and use the wronte methods for different actions. For instance, the GraphQL protocol uses the POST method to retrieve data, this is mainly because of the structure of the request, but it's a poor way of requesting data because, by default, POST requests are not cached by browsers or web servers, while GET requests [are cached](/advanced/caching). It's important to know when to use each method to build consistent APIs.

## Headers

[HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) are a way for clients and servers to exchange extra information when communicating. Headers are structured as a list of key-value pairs, separated by a color `:`.

Headers can be well-known and each server and client should know how to handle the request/response depending on what headers are present, or they can be custom, often starting with an `x-` (e.g. `x-amzn-requestid`). Let's understand some commonly used request and response headers.

- Request Headers:
  - `Accept: */*`: The `Accept` header specifies what types of content the client can handle. This header is commonly used by servers that serve images, so for example a browser that supports the `webp` or `avif` formats will include this in the `Accept` header, so the server will know that it's able to serve these types of images as they are more efficient.
  - `Cookie`: A commonly misunderstood header, this is the header that causes our headaches with GDPR popups. To keep this section brief, you should go [learn more on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie).
  - `Origin`: The culprit of many [CORS](/advanced/cors) errors, but you must know about it. This header basically represents the current website you are on, complete with the scheme and host.
- Response Headers:
  - `Content-Type: */*`: Represents the [type of data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) returned in the body of the request. For example, a JSON response is `application/json`, a JPEG image would be `image/jpeg`, and so on. This header will be used by the browser (or your own code) to determine what to do with the response and how to parse it. A common error when handling responses in application code results from incorrectly (or not at all) handling the response content type, resulting in errors parsing the body.
  - `Access-Control-*`: These are security headers servers send that specify what kinds of requests **a browser** can make. You will need to work with these headers when handling [CORS](/advanced/cors) errors.
  - `Cache-Control`: A useful header that a server can use to indicate whether a resource should be cached or not. For example, a value of `public, max-age=3600` will tell the browser (or other intermediare cache servers) to cache this response for 3600 seconds, any subsequent requests being served much quicker.

## The Body

The body of a request or response can be pretty much anything. From text to binary data, sometimes even a combination. What's important however, is that the body matches the `Content-Type` header.

## Status Codes

Responses can send an extra information that tells what happened. This information is called a **Status Code**, which is a number. Status Codes have different designations, and a client can and should act according to what the status code says.

- `100-199`: These are [informational](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses), which you won't use most of the time, so we won't get into any details.
- `200-299`: These codes represent [success](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses), and the most common is `200 OK`. You can also use, for example, `201 Created` in response to a POST request or `204 No Content` when a request was successful but there is no other content to be provided back.
- `300-399`: Indicating a [redirect](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages), these response headers will tell the client to make a new request to another resource which is indicated by through the `Location` header. You can use this status code when some content was moved to another URL, or during an authentication process such as OAuth. The most common redirection codes are `301`, `302`, `307` or `308`.
- `400-499`: These are used to indicate an error that originates from [the client](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses). For example, you can return `400 Bad Request` when the client sends a number when a string was expected, `401 Unauthorized` when the user is not logged in, `403 Forbidden` when the user does not have enough permissions to view a resource, or `404 Not Found` when a resource does not exist.
- `500-599`: When a [server encounters an unexpected](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) error, you return a 5xx status code. For example, if the request is correct, but the server encounters an error due to a programming-related bug, then you must return `500 Internal Server Error`.
