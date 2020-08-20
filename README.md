# backend

# Documentation for Pintereach API

<b>BaseURL:</b> https://pintereach1api.herokuapp.com

As a researcher, it's difficult to keep track of articles you want to read later. Pintereach helps you research by enabling you to save and organize articles in to categories to read later.

<details>
<summary><b>POST - Register a new user</b></summary>

Endpoint: BaseURL/api/auth/register
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
        "password": "$2a$08$yOVH2s1SQF57YA2V/LKDO.JRO02qtifGTFrmC4ql0/ONNVxiGjLX.",
        "role": 1
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6InVzZXI1Iiwicm9sZSI6MSwiaWF0IjoxNTk3ODc4OTQ2LCJleHAiOjE1OTc4ODYxNDZ9.OAJUXgX_fbQ8djZpFNBxw8ztyPi-FgvPrgv6DlgIILU"
}
```

</details>

<details>
<summary><b>POST - Login a user</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/auth/login</code>
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
<summary><b>GET - Get a list of users for a user with admin role</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/admin/users</code>
<br>
<br>
Admin access endpoint. Token required.
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
<summary><b>GET - Get a list of all articles of all users for a user with user role</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/articles</code>
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
<summary><b>GET - Get a user profile information for a user with user role</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id</code>
<br>
<br>
User access endpoint. Token required.
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
        "password": "qwerty",
        "role": 2
    }
]
```

</details>

<details>
<summary><b>GET - Get a list of a user articles for a user with user role</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles</code>
<br>
<br>
User access endpoint. Token required.
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
<summary><b>GET - Get a user article with specific id for a user with user role</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id/articles/:articleID</code>
<br>
<br>
User access endpoint. Token required.
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
<summary><b>POST - Post a new user article for a user with user role</b></summary>
<br>
Endpoint: BaseURL/api/users/:id/articles
<br>
<br>
User access endpoint. Token required.
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
<summary><b>PUT - Update an article for a user with user role</b></summary>
<br>
Endpoint: BaseURL/api/articles/:id
<br>
<br>
User access endpoint. Token required.
<br>
<br>
Requires an object with fildes that will be updated:

```
{
    "title": "The New Power Article updated by user2",
      "description": "How to Build Article updated by user2",
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
