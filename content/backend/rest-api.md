---
title: REST API's
---

A RESTful API is just a way of structuring your endpoints that revolves around the concept of `resources`. As the name implies, a URL is a string that uniquely identifies a `resource` (Uniform Resource Locator), as such, the RESTful architecture keeps this idea at it's core, and each URL is structured in a way that identifies resources and subresource logically. Let's take a look at a few examples

- `GET /workspaces`: this endpoint is expected to return a list of all workspaces
- `POST /workspaces`: similarly, here we expect to be able to create a new workspace
- `GET /workspaces/{workspace_id}`: this endpoint specifies specific resource through a **path parameter** `workspace_id`, so when querying for `/workspaces/1` we should expect receiving the workspace whose ID is `1`
- `POST /workspace/{workspace_id}/projects/{project_id}/members`: in this case, you can notice the hierarchy of resources in the path. This endpoint is expected to add a new project member into the project with ID `project_id` inside the workspace `workspace_id`.

These are just a few examples to get a better grasp of the hierarchy and structure of RESTful API endpoints. There are some general rules you need to follow when constructing RESTful APIs:

1. **Resources are always plural**. There are always multiple resources in a collection, thus it's only appropriate to use plurals. It should be **avoided** to name endpoints like `GET /workspaces/all`.
2. **Don't use verbs**: Endpoint paths should always contain nouns, primarily because we are working with resources. Verbs are already present in the **method**. Instead of `POST /workspaces/create` you should use `POST /workspaces`.
3. **Hierarchy should be respected**: Just like in the example above, think of the hierarchy of resources. Members are part of a project, and projects are part of a workspace. If one wants to get the members of a project, they should use the appropriate hierarchical URL. Though, there are instances where you want to skip the hierarchy, for example in an admin dashboard. Maybe you don't care about the workspace a project is in, so you can create an endpoint that returns all projects in the database `GET /projects` irrespective of the workspace.

## Read more

You can (and should) read more about REST API's and best practices.

- [Understanding REST API's](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)
- Inspiration: [GitHub API](https://docs.github.com/en/rest/authentication/endpoints-available-for-github-app-installation-access-tokens?apiVersion=2022-11-28)
- Inspiration: [Stripe API](https://docs.stripe.com/api)