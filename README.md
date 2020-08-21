# backend

# Documentation for Pintereach API

<b>BaseURL:</b> https://pintereach1api.herokuapp.com

As a researcher, it's difficult to keep track of articles you want to read later. Pintereach helps you research by enabling you to save and organize articles in to categories to read later.

## Used frameworks and modules

---

- [Node.js](https://nodejs.org/) - Asynchronous event-driven JavaScript runtime for executing JavaScript at the server outside the browser
- [Express.js](https://expressjs.com/) -Express is a minimal and flexible Node.js web application framework
- [SQLite](https://sqlite.org/) - SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine
- [Knex.js](https://knexjs.org/) - A SQL query builder that helps abstracting migrations and DDLs for different database types into a single coherent structure
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - Bcrypt takes a user password in a plain text and translate that into a string that it is not possible to reverse back into the password.
- [CORS](https://www.npmjs.com/package/cors) - A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- [Helmet](https://www.npmjs.com/package/helmet) - A collection of 14 smaller middleware functions that set HTTP response headers
- [JWT](https://jwt.io/) - JSON Web Token for authorization users
- [PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system
- [Supertest](https://www.npmjs.com/package/supertest) - A test module for HTTP assertions
- [Jest](https://jestjs.io/) - A simple JavaScript testing framework
- [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into process.env

---

## User endpoints

---

<details>
<summary><b>POST - Register a new user</b><br>
<b>Endpoint:</b> <code>BaseURL/api/auth/register</code>
<br>
</summary>
<br>
<br>

Requires an object with a username, password, name, email - all string data types, and role is 1 for admin, and 2 for user:

```
{
	"username": "aaron",
    "password": "qwerty",
    "name": "Aaron",
    "email": "aaron@gmail.com",
    "role": 1
}
```

When successful will return status code of 201 (CREATED), the new user object and a token (example):

```
{
    "data": {
        "id": 5,
        "username": "aaron",
        "name": "Aaron",
        "email": "aaron@gmail.com",
        "role": 1
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InVzZXI1Iiwicm9sZSI6MSwiaWF0IjoxNTk3ODc4OTQ2LCJleHAiOjE1OTc4ODYxNDZ9.OAJUXgX_fbQ8djZpFNBxw8ztyPi-FgvPrgv6DlgIILU"
}
```

</details>

<details>
<summary><b>POST - Login a user</b><br>
<b>Endpoint:</b> <code>BaseURL/api/auth/login</code>
<br>
</summary>
<br>
<br>
Requires an object with a username and password, both string data types:

```
{
	"username": "aaron",
	"password": "qwerty"
}
```

When successful will return status code of 200 (OK), the new item object and a token (example):

```
{
    "message": "Welcome to our API, aaron!",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InVzZXI1Iiwicm9sZSI6MSwiaWF0IjoxNTk3ODc4OTk1LCJleHAiOjE1OTc4ODYxOTV9.9qlaKD7OyaS7iDgeNODW7fQpIK3pNxoFhWRcCHHxkmo"
}
```

</details>

<details>
<summary><b>GET - Get a list of users for a user with admin role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/admin/users</code>
<br>
</summary>
<br>
<br>
Admin access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of users:

```
[
    {
        "id": 1,
        "username": "user1",
        "name": "John Doe",
        "email": "john@gmail.com"
    },
    {
        "id": 2,
        "username": "user2",
        "name": "Jane Cimegra",
        "email": "jane@gmail.com"
    },
    {
        "id": 3,
        "username": "user3",
        "name": "Robbin Wilson",
        "email": "robbin@gmail.com"
    },
    {
        "id": 4,
        "username": "user4",
        "name": "Jack Dirreban",
        "email": "jack@gmail.com"
    },
    {
        "id": 5,
        "username": "aaron",
        "name": "Aaron",
        "email": "aaron@gmail.com"
    }
]
```

</details>

<details>
<summary><b>GET - Get a list of all articles of all users for a user with user or admin roles</b><br>
<b>Endpoint:</b> <code>BaseURL/api/authusers/articles</code>

<br>
</summary>
<br>
<br>
User access endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of articles:

```
[
    {
        "id": 1,
        "title": "Microbial OmcZ nanowires",
        "description": "Electric field stimulates production of highly conductive microbial OmcZ nanowires",
        "link": "https://www.nature.com/articles/s41589-020-0623-9"
    },
    {
        "id": 2,
        "title": "Anticancer immune response",
        "description": "Targeted glycan degradation potentiates the anticancer immune response in vivo",
        "link": "https://www.nature.com/articles/s41589-020-0622-x"
    },
    {
        "id": 3,
        "title": "New Habit",
        "description": "How Long Does it Actually Take to Form a New Habit? (Backed by Science)",
        "link": "https://jamesclear.com/new-habit"
    },
    {
        "id": 4,
        "title": "SARS-CoV-2 spike proteins",
        "description": "Structures and distributions of SARS-CoV-2 spike proteins on intact virions",
        "link": "https://www.nature.com/articles/s41586-020-2665-2"
    },
    {
        "id": 5,
        "title": "The Power of Synaptic Pruning",
        "description": "How to Build New Habits by Taking Advantage of Old Ones",
        "link": "https://www.nature.com/articles/s41586-020-2665-2"
    }
]
```

</details>

<details>
<summary><b>GET - Get a user profile information for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a user profile information:

```
[
    {
        "id": 2,
        "username": "user2",
        "name": "Jane Cimegra",
        "email": "jane@gmail.com",
        "role": 2
    }
]
```

</details>

<details>
<summary><b>PUT - Update a user profile for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
Requires an object with fildes that will be updated:

```
{
    "username": "user5",
    "name": "Masha",
    "email": "masha@gmail.com",
    "role": 2

}
```

When successful will return status code of 200 (OK), and an updated user object :

```
{
    "id": 6,
    "username": "user51",
    "name": "Masha1",
    "email": "mash1a@gmail.com",
    "role": 2
}
```

</details>

<details>
<summary><b>GET - Get a list of a user articles for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of articles of a user with id:

```
[
    {
        "article_id": 2,
        "user_id": 2,
        "title": "Anticancer immune response",
        "description": "Targeted glycan degradation potentiates the anticancer immune response in vivo",
        "link": "https://www.nature.com/articles/s41589-020-0622-x",
        "category_name": "Hypotheses",
        "category_id": 2,
        "rank_id": 4
    },
    {
        "article_id": 4,
        "user_id": 2,
        "title": "SARS-CoV-2 spike proteins",
        "description": "Structures and distributions of SARS-CoV-2 spike proteins on intact virions",
        "link": "https://www.nature.com/articles/s41586-020-2665-2",
        "category_name": "Research",
        "category_id": 1,
        "rank_id": 1
    }
]
```

</details>

<details>
<summary><b>GET - Get a user article with specific id for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles/:articleID</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a user article with articleID:

```
[
    {
        "article_id": 2,
        "user_id": 2,
        "title": "Anticancer immune response",
        "description": "Targeted glycan degradation potentiates the anticancer immune response in vivo",
        "link": "https://www.nature.com/articles/s41589-020-0622-x",
        "category_name": "Hypotheses",
        "category_id": 2,
        "rank_id": 4
    }
]
```

</details>

<details>
<summary><b>POST - Post a new user article for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
Requires an object with a title, description, link, category_id, and rank_id:

```
{
    "title": "The New Power Article",
      "description": "How to Build Article created by user2",
      "link": "https://www.nature.com/articles/s41586-020-2665-2",
      "category_id": 3,

      "rank_id": 4

}
```

When successful will return status code of 201 (CREATED), and new article object :

```
{
    "id": 7,
    "title": "The New Power Article",
    "description": "How to Build Article created by user2",
    "link": "https://www.nature.com/articles/s41586-020-2665-2",
    "rank_id": 4,
    "user_id": 2,
    "category_id": 3
}
```

</details>

<details>
<summary><b>PUT - Update an article for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/articles/:id</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
Requires an object with fildes that will be updated:

```
{
    "title": "The New Power Article",
      "description": "How to Build Article",
      "link": "https://www.nature.com/articles/s41586-020-2665-2",
      "category_id": 2,

      "rank_id": 1

}
```

When successful will return status code of 200 (OK), and an updated article object :

```
{
    "id": 7,
    "title": "The New Power Article updated by user2",
    "description": "How to Build Article updated by user2",
    "link": "https://www.nature.com/articles/s41586-020-2665-2",
    "rank_id": 1,
    "user_id": 2,
    "category_id": 2
}
```

</details>

<details>
<summary><b>DELETE - Delete an article by article's id for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/articles/:id</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
No body required in the request. 
<br>
<br>
When successful will return an HTTP status code of 200 (OK) and an id of the deleted article. Here is an example:

```
{
    7
}
```

</details>

<details>
<summary><b>GET - Get a list of categories  users with user or admin role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/authusers/categories</code>
<br>
</summary>
<br>
<br>
User access endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of categories:

```
[
    {
        "id": 1,
        "category_name": "Research"
    },
    {
        "id": 2,
        "category_name": "Hypotheses"
    },
    {
        "id": 3,
        "category_name": "Commentaries"
    },
    {
        "id": 4,
        "category_name": "Psychology"
    }
]
```

</details>

<details>
<summary><b>POST - Post a new category for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/categories</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
Requires an object with a category_name:

```
{

        "category_name": "Archaeology"
    }
```

When successful will return status code of 201 (CREATED), and new category object :

```
{
    "id": 7,
    "category_name": "Archaeology"
}
```

</details>

<details>
<summary><b>PUT - Update a category for a user with admin role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/admin/categories/:id</code>
<br>
</summary>
<br>
<br>
Admin access restricted endpoint. Token required.
<br>
<br>
Requires an object with fildes that will be updated:

```
{

        "category_name": "Archaeology IIV"
    }
```

When successful will return status code of 200 (OK), and an updated category object :

```
{
    "id": 7,
    "category_name": "Archaeology IIV"
}
```

</details>

<details>
<summary><b>DELETE - Delete a category by category's id for user with admin role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/admin/categories/:id</code>
<br>
</summary>
<br>
<br>
Admin access restricted endpoint. Token required.
<br>
<br>
No body required in the request. Category will be deleted if it is not exist in any articles.
<br>
<br>
When successful will return an HTTP status code of 200 (OK) and an id of the deleted category. Here is an example:

```
{
    7
}
```

</details>

<details>
<summary><b>GET - Get a list of user articles sorted by rank for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles/rank</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of articles, sorted by rank:

```
[
    {
        "rank": 1,
        "user_id": 2,
        "article_id": 4,
        "title": "SARS-CoV-2 spike proteins",
        "description": "Structures and distributions of SARS-CoV-2 spike proteins on intact virions",
        "link": "https://www.nature.com/articles/s41586-020-2665-2",
        "category_name": "Research",
        "category_id": 1
    },
    {
        "rank": 4,
        "user_id": 2,
        "article_id": 2,
        "title": "Anticancer immune response",
        "description": "Targeted glycan degradation potentiates the anticancer immune response in vivo",
        "link": "https://www.nature.com/articles/s41589-020-0622-x",
        "category_name": "Hypotheses",
        "category_id": 2
    }
]
```

</details>

<details>
<summary><b>GET - Get a list of user articles  by specific rank for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles/rank/:rankID</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of articles with specific rank:

```
[
    {
        "rank": 4,
        "user_id": 2,
        "article_id": 2,
        "title": "Anticancer immune response",
        "description": "Targeted glycan degradation potentiates the anticancer immune response in vivo",
        "link": "https://www.nature.com/articles/s41589-020-0622-x",
        "category_name": "Hypotheses",
        "category_id": 2
    }
]
```

</details>

<details>
<summary><b>GET - Get a list of ranks  users with user or admin roles</b><br>
<b>Endpoint:</b> <code>BaseURL/api/authusers/ranks</code>
<br>
</summary>
<br>
<br>
User or admin access endpoint. Token required.
<br>
<br>

When successful will return status code of 200 (OK), and the a list of ranks:

```
[
    {
        "id": 1,
        "rank": 1
    },
    {
        "id": 2,
        "rank": 2
    },
    {
        "id": 3,
        "rank": 3
    },
    {
        "id": 4,
        "rank": 4
    }

]
```

</details>
<details>
<summary><b>POST - Post a new rank for a user with user role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/ranks</code>
<br>
</summary>
<br>
<br>
User access restricted endpoint. Token required.
<br>
<br>
Requires an object with a rank:

```
{
    "rank": 5
}
```

When successful will return status code of 201 (CREATED), and new rank object :

```
{
    "id": 5,
    "rank": 5
}
```

</details>

<details>
<summary><b>DELETE - Delete a rank by rank's id for user with admin role</b><br>
<b>Endpoint:</b> <code>BaseURL/api/admin/ranks/:id</code>
<br>
</summary>
<br>
<br>
Admin access restricted endpoint. Token required.
<br>
<br>
No body required in the request. Rank will be deleted if it is not exist in any articles.
<br>
<br>
When successful will return an HTTP status code of 200 (OK) and an id of the deleted rank id. Here is an example:

```
{
    7
}
```

</details>

---

## Table Entities

---

### Role Data

| attribute | data type | required -                                              |
| --------- | --------- | ------------------------------------------------------- |
| id        | integer   | auto-assigns                                            |
| role      | integer   | Yes, and must be unique, 1-admin, 2-user, by default -2 |

### User Data

| attribute | data type | required                |
| --------- | --------- | ----------------------- |
| id        | integer   | auto-assigns            |
| email     | string    | Yes, and must be unique |
| password  | string    | Yes                     |
| username  | string    | Yes, and must be unique |
| name      | string    | Yes                     |
| role      | integer   | No, default to user     |

### Rank Data

| attribute | data type | required                |
| --------- | --------- | ----------------------- |
| id        | integer   | auto-assigns            |
| rank      | integer   | Yes, and must be unique |

### Category Data

| attribute     | data type | required                |
| ------------- | --------- | ----------------------- |
| id            | integer   | auto-assigns            |
| category_name | string    | Yes, and must be unique |

### Article Data

| attribute   | data type | required                |
| ----------- | --------- | ----------------------- |
| id          | integer   | auto-assigns            |
| title       | string    | Yes, and must be unique |
| description | string    | Yes                     |
| link        | string    | Yes                     |
| rank_id     | integer   | Yes                     |
| user_id     | integer   | Yes                     |
| category_id | integer   | Yes                     |

---
