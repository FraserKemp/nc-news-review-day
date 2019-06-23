# NC News ![Version](https://img.shields.io/badge/Version-1.0-brightgreen.svg) ![release date](https://img.shields.io/badge/Release%20Date-June%202019-blue.svg)

NC News is a web application designed to act as a repository for news articles. The relational database stores the Articles, Comments, Topics, and Users.

Hosted: https://joshs-coding-world.herokuapp.com/

## Getting Started

### Prerequisites

- node version 10
- PostgreSQL version 11
- npm version 6
- API Testing tool (Insomnia, etc.)

### Installation

1. Clone this repository

```bash
git clone https://github.com/FraserKemp/NC-News-BE-Fraser
```

2. `cd` into the repository

```bash
cd NC-News-BE-Fraser
```

3. Install the dependencies

```bash
npm install
```

4. Run the "setup-dbs" script

```bash
npm run setup-dbs
```

5. Run the "seed" script

```bash
npm run seed
```

6. Run the "host" script to start running the server locally

```bash
npm run dev
```

7. To stop running the server user use ctrl + c

### Usage

Once the server is up and running the following endpoints and methods will be available.

Note: GET request can be run from a browser using "localhost:9090" before an endpoint, however all other methods will require an API testing tool.

- /api:

  - GET - will respond with an object containing the endpoints along with an description of what will return and any rules for the method.
  - The URL should resemble - "localhost:9090/api"

- /api/topics:

  - GET:

    - Description: Returns an on object containing an array of all topics
    - Response example:

    ```js
    {
      "topics": [
        {
          "slug": "coding",
          "description": "Code is love, code is life"
        },
        {
          "slug": "football",
          "description": "FOOTIE!"
        },
        {
          "slug": "cooking",
          "description": "Hey good looking, what you got cooking?"
        }
      ]
    }
    ```

- /api/topics/topicName:

  - GET:

    - Description: Returns an on object containing an array of a topics
    - Response example:

    ```js
    {
      "topics": [
        {
          "slug": "coding",
          "description": "Code is love, code is life"
        },
        {
          "slug": "football",
          "description": "FOOTIE!"
        },
        {
          "slug": "cooking",
          "description": "Hey good looking, what you got cooking?"
        }
      ]
    }
    ```

  - POST: /api/topics

    - Description: Returns the record of the newly posted topic
    - Body Example:

    ```js
    {
      "slug": "slug_name_here",
      "description": "description_here"
    }
    ```

    - Response Example:

    ```js
    {
      "topic": {
        "slug": "slug_name_here",
        "description": "description_here"
      }
    }
    ```

- /api/articles:

  - GET:

    - Description: Returns an on object containing an array of all articles
    - Response Example:

    ```js
    {
      "total_count": 12,
      "articles": [
        {
          "article_id": 1,
          "title": "Example title",
          "body": "Example body",
          "votes": 100,
          "topic": "Example topic",
          "author": "Example author",
          "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
          "comment_count": "13"
        },
        {
          "article_id": 3,
          "title": "Example title",
          "body": "Example body",
          "votes": 0,
          "topic": "Example topic",
          "author": "Example author",
          "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
          "comment_count": "0"
        }
      ]
    }
    ```

    - Query Example:
      https://localhost:9090/api/articles?author=[AUTHOR]&topic=[TOPIC]&sort_by=[COLUMN]&order=[ORDER]&limit=[LIMIT]&p=[PAGE]

    - Query Rules:

    ```js
    {
      "AUTHOR": "FILTER, by the username",
      "TOPIC": "FILTER, by topic",
      "COLUMN": [
        "article_id",
        "title",
        "body",
        "votes",
        "topic",
        "author",
        "created_At",
        "comment_count"
      ],
      "ORDER": ["asc", "desc"],
      "LIMIT": "Limit the number of results being displayed, defaults to 10",
      "PAGE": "Choose which page to start displaying result from, calculated pased on the limit"
    }
    ```

  - POST:

    - Description: Returns the record of the newly post article
    - Body Example:

    ```js
    {
      "title": "title_here",
      "body": "body_here",
      "topic": "topic_here",
      "username": "username_here"
    }
    ```

    - Response Example:

    ```js
    {
      "article": {
        "article_id": "1",
        "title": "title_here",
        "body": "body_here",
        "votes": 0,
        "topic": "topic_here",
        "author": "username_here",
        "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'"
      }
    }
    ```

- /api/articles/:article_id:

  - **Note: :article_id must be an integer**
  - GET:

    - Description: Returns an on object containing the article with the matching id
    - Response:

    ```js
    {
      "article": {
        "article_id": 1,
        "title": "Living in the shadow of a great man",
        "body": "I find this existence challenging",
        "votes": 100,
        "topic": "mitch",
        "author": "butter_bridge",
        "created_at": "2018-11-15T12: 21: 54.000Z",
        "comment_count": "13"
      }
    }
    ```

  - PATCH:

    - Description: Returns an object containing the updated article
    - Body Example:

    ```js
    {
      "inc_votes": 2
    }
    ```

    - Response:

    ```js
    "response": {
        "article": {
          "article_id": 1,
          "title": "Living in the shadow of a great man",
          "body": "I find this existence challenging",
          "votes": 102,
          "topic": "mitch",
          "author": "butter_bridge",
          "created_at": "2018-11-15T12: 21: 54.000Z",
          "comment_count": "13"
        }
      }
    ```

  - DELETE:
    - Description: Returns a status:204 with no body

- /api/articles/:article_id/comments

  - **Note: :article_id must be an integer**
  - GET:
    Description: Returns an on object an array of comments related to the article

    - Response Example:

    ```js
    {
      "comments": [
        {
          "comment_id": 2,
          "author": "butter_bridge",
          "article_id": 1,
          "votes": 14,
          "created_at": "2016-11-22T12: 36: 03.000Z",
          "body": "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
        }
      ]
    }
    ```

    - Query Example:
      https://localhost:9090/api/articles?sort_by=[COLUMN]&order=[ORDER]&limit=[LIMIT]&p=[PAGE]

    - Query Rules:

      ```js
      {
        "COLUMN": ["comment_id", "body", "votes", "author", "created_At"],
        "ORDER": ["asc", "desc"],
        "LIMIT": "Limit the number of results being displayed, defaults to 10",
        "PAGE": "Choose which page to start displaying result from, calculated based on the limit"
      }
      ```

  - POST:

    - Description: Returns an object with the newly added comment
    - Body Example:

    ```js
    {
      "username": "username_here",
      "body": "body_here"
    }
    ```

    - Response Example:

    ```js
    {
      "comment": {
        "comment_id": 19,
        "author": "username_here",
        "article_id": 1,
        "votes": 0,
        "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
        "body": "body_here"
      }
    }
    ```

- /api/comments/:comment_id:

  - **Note: comment_id must be an integer**
  - PATCH:
    - Description: Returns an object containing the updated comment
    - Body Example:
    ```js
    {
      "inc_votes": 2
    }
    ```
    - Response Example:
    ```js
    {
      "comment": {
        "comment_id": 2,
        "author": "username_here",
        "article_id": 1,
        "votes": 17,
        "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
        "body": "body_here"
      }
    }
    ```
  - Delete:
    - Description: Returns a status:204 with no body

- /api/users:

  - GET:
    - Description: Returns an on object containing an array of all users
    - Response:
    ```js
    {
      "users": [
        {
          "username": "butter_bridge",
          "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          "name": "jonny"
        }
      ]
    }
    ```
  - POST:
    - Description: Returns an object with the newly added user
    - Body Example:
    ```js
    {
      "username": "username_here",
      "avatar_url": "https: //www.longstring.com",
      "name": "bill"
    }
    ```
    - Response:
    ```js
    {
      "user": {
        "username": "username_here",
        "avatar_url": "https://www.longstring.com",
        "name": "bill"
      }
    }
    ```

- /api/users/:username:

  - GET:
    - Description: Returns an object with the user
    - Response Example:
    ```js
    {
      "user": {
        "username": ":username",
        "avatar_url": "https: //avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        "name": "paul"
      }
    }
    ```

- /api/users

  - GET:
    - Description: returns an object with the users
    - Response Example:
    ```js
    {
      "users": [
        {
        "username": "tickle122",
        "avatar_url": "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
        "name": "Tom Tickle"
      },
      {
        "username": "grumpy19",
        "avatar_url": "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
        "name": "Paul Grump"
      },
      {
        "username": "happyamy2016",
        "avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
        "name": "Amy Happy"
      },
      {
        "username": "cooljmessy",
        "avatar_url": "https://i.imgur.com/WfX0Neu.jpg",
        "name": "Peter Messy"
      },
      {
        "username": "weegembump",
        "avatar_url": "https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg",
        "name": "Gemma Bump"
      },
      {
        "username": "jessjelly",
        "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        "name": "Jess Jelly"
      },
      {
        "username": "Guest",
        "avatar_url": "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        "name": "guest"
      }
      ]
    }
    ```

### Running the tests

In order to run the automated tests, you will need to run the "test" script

```bash
npm test
```

### Built with

- Express.js - Back-end Framework
- Knex.js - Query builder for SQL based databases
- postgreSQL - Object-relational database management system
- Testing:
  - Mocha
  - Chai

### Version

- 1.0

### Author

Fraser Kemp

### Acknowledgements

This app was created as part of a project at the Northcoders Bootcamp. A big thank you to all the staff and fellow students.
