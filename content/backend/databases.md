---
title: Databases
---

Your application will always need to store data. While you could use a simple JSON file for storage, a fully-fledged database will offer many more features and safety mechanisms so your data stays intact. We will talk about the two main types of databases you will meet most often, but we'll also give a brief overview of other database types.

## Relational Databases

By far the most common type of databse, a relational database - also referred to as SQL - is a type of database that is used when your data is well structured and relational in nature. Some of the most popular open-soruce SQL databases are [PostgreSQL](https://www.postgresql.org/), [MySQL](https://www.mysql.com/) and [SQLite](https://www.sqlite.org/).

Relational databases offer strong data consistency, while still giving enough freedom to model your data in the ways you want. In a relational database you define tables, and each table is composed of multiple columns, and each column (or groups of columns) can have different constraints that prevent unwanted data in. Let's take a look at an example:

```sql
-- postgresql syntax
create table products {
  id serial primary key,
  serial_code varchar(255) unique not null,
  price numeric constraint positive_price check (price > 0),
  created_at timestamptz default now(),
  updated_at timestamptz
};
```

The above SQL code creates a table `products` with the following columns and constraints:

- `id` is the primary key and is auto-incrementing. A primary-key is the identifier of a row in the table and must be unique in the whole table. The `id` is auto-incrementing, meaning that each new row's `id` is automatically 1 greater than the last inserted row;
- `serial_code` is a varchar (i.e. text) of maximum 255 characters, which must be unique and can never be `null`;
- `price` can be a numeric value (or null), and must always be greater than 0;
- `created_at` and `updated_at` are timestamp's that also contain a timezone. The `created_at` column always defaults to the current time when a new row is inserted.

We only skimmed the surface, however there is a whole lot more to cover. You can learn more:

- [Inserting data](https://www.postgresql.org/docs/current/tutorial-populate.html)
- [Querying data](https://www.postgresql.org/docs/current/tutorial-select.html)
- [Cross-table querying, i.e. joins](https://www.postgresql.org/docs/current/tutorial-join.html)
- [Transactions](/advanced/transactions)
- [Indexes](/advanced/indexes)
- [Triggers](https://www.postgresql.org/docs/current/trigger-definition.html)
- [Normalizing](https://popsql.com/blog/normalization-in-sql)
- [Database design](https://support.microsoft.com/en-gb/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5)

> [!question] You mostly linked PostgreSQL examples
>
> Good point. All of the concepts we discussed are common to most (if not all) SQL databases, you can always check the documentation of the database system you are working with, the main differences are in syntax.

## Non-Relational Databases

Relational databases are well-suited for a wide range of use-cases, however there are times when you need more specialized needs, and that's where NoSQL comes in.

Non-Relational Databases are poorly suited for relational data, most NoSQL databases seldom having the possibility to create relations between different collections of data, and even if they do have that possibility, it's most likely a footgun that can lead to very poor performance. A NoSQL database is well-suited when your data structure is undefined or only part of the data structure is known. Another good use-case for NoSQL databases is in search or analytics. Having a single "table" where you can put all of your data that is then queried is what NoSQL is perfect for.

NoSQL databases differ from SQL databases in the way they structure data. In NoSQL we don't use the term "table" but rather "collection". In the same manner, a "row" is in NoSQL a "document". The document is most likely of a JSON structure that can change from one document to the other, even if they are in the same collection.

In time, you will notice that most data is highly relational, that's how our world works for better or worse. But, when would be use a NoSQL database then? Let's take a couple examples.

### Search

A good search system is hard to implement, and even harder - almost impossible - in SQL. A popular search database is ElasticSearch. What makes NoSQL suitable for search is the fact that you can store different types of data (e.g. products, orders, users, etc.) in the same collection, while keeping it easily searchable. Let's take a look at a couple of documents that we would insert.

```json5
[
  {
    "_id": "018e9153-b8de-72a7-b222-386da6ef798e",
    "type": "company",
    "name": "Webamboos",
    "vat_code": "RO123456"
    "company": { /* company-specific data */ }
  },
  {
    "_id": "018e9154-1da0-71b9-bedb-837f001d3fa0",
    "type": "user",
    "name": "John Doe",
    "email": "john@doe.com",
    "user": { /* user-specific data */ }
  }
]
```

As you can see, the 2 documents above have a somewhat similar structure, while still keeping some records distinct. Our search system can [index](/advanced/indexing) documents based on the fields we give it, making it possible to search for these documents in the same query, no need for different ways of querying.

### Big-data

Cars, phones, sensors, IoT devices and even your fridge - all of these come with highly capable hardware that can not only do computation, but they can also gather data every second or even more often about how they are used or the environment they are in. The huge amount of data that needs to be collected is called Big-data. All of this data can amount to billions if not trillions of records in a database. But all of this data is useless without a way to analyze it.

This is another area where NoSQL is well suited. Databases such as Apache Cassandra or Google's BigQuery can handle the huge amounts of data coming in from different types of devices. Once the data is ingested, automatic processes can parse that data into more managable chunks that can be analyzed by data scientists to aid businesses achieve their goals.

### Key-value stores

Key-values stores are highly-performant databases that can be used for caching or for distributed processing of tasks. Redis is a popular example, an extremely fast database that can be used for caching data, storing application state, managing queues and background tasks, and more.

### Other database types

There are other types of databases we haven't covered here, but we'll give you some resources for further reading:

- [Graph databases](https://en.wikipedia.org/wiki/Graph_database)
- [Column-oriented databases](https://en.wikipedia.org/wiki/Column-oriented_DBMS)
- [Vector databases](https://en.wikipedia.org/wiki/Vector_database)
