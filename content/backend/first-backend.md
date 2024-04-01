---
title: Your first backend
---

As part of the Guidebook, we will work on a small project. The project will first entail a complete backend service that will later be used on the frontend.

## Background

Jimmy is looking to buy a home, however it's difficult to keep track of all the homes he wishes to see, good and bad points of each home, prices and so on. He noticed that his friends also had this problem at some point, so he decided that he wants to create a simple app where people can keep track of homes they are looking to buy.

Your task is to build a simple backend service that will handle all server-side operations for the service. You will also need to [build a frontend](/frontend/first-frontend) for this service, so you can first build the backend, or build them both in parallel.

## Requirements

To build this service you will need to use all the information you already learned, and also learn new things along the way. The final user experience in the application is not very important, however there are other more important aspects you need to keep in mind:

- **Security**: Multiple users can interact at the same time with the app, you will need to build a simple and secure authentication and authorization system for interactions to be isolated for each user. The way this is handled should follow best practices.
- **API robustness**: Validating user input, correctly handling errors, consistent and clear API request formats and responses are important in any application. This won't make only your life easier, but of others as well. Furthermore, a disciplined approach from the start will make this much easier in the future.
- **Code quality**: While this project can be done alone, you will often work in teams. It's important to write maintainable and easy-to-read code that can later be understood by others and easily modified.

### Authentication & Authorization

The application should accomodate multiple users who can manage their own libraries of homes. To achieve this we will need a simple authentication system. Simply put, new users should be able to create a new account and log into it. Moreover, bad actors should not be allowed to modify what other users added into the system. For this, we'll need to implement an authorization system where each request made to the backend will first be authorized and checked that any reads or writes are only allowed for the current user, and not for others.

> [!note] Checklist
> The following list is to give you a general direction so you have a clear goal, but they are by no means comprehensive. You can add any other functionalities as well and you'll often be required to fill in the gaps. For instance, the checklist don't constrain you on how your database should be structured, but you should nevertheless think about that as well.
> 
> - [ ] Users should be able to create a new account using their email
> - [ ] Passwords must be hashed according to [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
> - [ ] Users should be able to log into their account using their email and password
> - [ ] If a user forgets his password, he should be able to recover it using a "forgot password" mechanism
> - [ ] Endpoints that handle user data should be protected by an authorization middleware which checks that each request contains an `Authorization` header or a session cookie

### Home Library

Each user will have their own library of homes they added into the system. Users can add homes through a form inside the application. When adding a new home into the library, the user should be able to specify some mandatory fields such as: `home address`, `coordinates` (for showing on a map), `title` (a name they can add), `labels` (custom labels that users can add), `notes` (a free-text field where users can add custom notes). You can add any other fields as you wish.

#### Labels

Every user can also create their own labels that they can assign to a home. They will be able to create these at any time, by assigning them a `name` and a `color`. They should also be able to update and delete them at any time.

> [!note] Checklist
> - [ ] Create a set of endpoints to create, read, update and delete labels.
> - [ ] Create a set of endpoints to create, read, update and delete homes.
> - [ ] Homes should be searchable by name and label. **Hint**: These options can be part of the read endpoint from the previous item. Query parameters are used as best-practice.
> - [ ] Optionally, a user could be able to see a list of important utilities in the vicinity of the home they add. For example, people want homes that are close to schools, shops or gyms, so we can build an API that will query an external system (such as the Google Maps API) to find such locations nearby, together with the distance.
>
> The set of "create, read, update and delete" endpoints are often abbreviated as CRUD.

### Tips

When it comes to code quality and readability, it's a good practice to use an automated formatter for your code such as [prettier](https:// prettier.io/). Additionally, you can also use a linter. A linter will check your code statically for any mistakes that can lead to small bugs and they can also enfore a code style that you and your teammates wish to follow. A popular linter is [eslint](https://eslint.org/), and you could use plugins for it such as [typescript-eslint](https://typescript-eslint.io/) and [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) for more oppinionated rules. Moreover, it's important to follow the right conventions. For instance, class names should be `PascalCase`, while variable and function names should be `camelCase`. Different languages have different rules, SQL for instance uses `snake_case` for the naming scheme.

You should always validate user input (i.e. request body, headers, query params, etc.). A bad actor could try to input huge strings that can bring your backend down to a halt, so make sure to add lenght limits (not too small, not too big, depends on the case). Furthermore, make sure the data format is consistent. Don't use numbers for values that don't make sense mathematically (e.g., phone numbers, postal codes), validate email formats or URLs (watch out for gotchas), don't restrict user names to first/last name ([have fun reading this](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)), and always protect yourself agains SQL injection attacks (ORM's already have such systems built in, but if you are using raw SQL, you should learn about [parameterized queries](https://node-postgres.com/features/queries)).

Make sure your endpoints don't expose sensistive data that should only be known by the backend. For example, a hashed password mustn't ever be exposed by a response. Other such examples include sensitive data like password reset tokens, personal data about other users that the client's authorization does not allow seeing, and so on.

Furthemore, make sure your endpoints are consistent. Errors should always be returned with appropriate status codes. Validation errors or errors that are caused by wrong input should always be `4xx`, while errors that are bugs in the system or inconsistent data in the database should be considered internal and must be returned as `5xx`. You should construct a global middleware that handles errors gracefully, so your endpoints don't need to take care of error handling and they can focus on the happy path. Additionally, endpoint request formats and responses should be consistent from one business component to another. It should be easy for clients to use and understand the API, but at the same time it should be easy for you, the backend developer, to make adjustments whenever needed. Avoid building API endpoints that are specific to a single use-case, and prefer looking for alternative solutions that can accomodate multiple use-cases.

When organizing your code, you can choose from different formats. A good approach is to structure your code by the [business components](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#1-project-architecture-practices), and common utilities and libraries to be kept outside of these components in a shared folder or library. Make sure to take a look into this [GitHub repository](https://github.com/goldbergyoni/nodebestpractices) for more tips.

## Getting started

Now that you have a general overview of what needs to be done, you can get started by creating a `git` repository in your local computer and start writing code!

> [!tip] Take notes
>
> Make sure you take notes of the process! For example, write down what patterns you used an why, what database and why, what libraries, what external API, what was hard, what was easy, any gotchas or interesting errors. Note everything down! Later, you might start your own blog too.