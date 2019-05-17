## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

hello
hello
hello
hello
hello
hello
null { username: 'butter_bridge',
avatar_url:
'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
name: 'jonny' }
{ slug: 'mitch', description: 'The man, the Mitch, the legend' } null
null undefined

### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### GET `/api/articles/1`

Assertion: expected undefined to equal '13'

Hints:

- ensure you have calculated a comment_count for the article

### PATCH `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the updated article with a key of `article`

### PATCH `/api/articles/1`

Assertion: expected undefined to equal 101

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 404 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### POST `/api/articles/1/comments`

Assertion: expected [ Array(1) ] to contain keys 'comment_id', 'author', 'body', 'votes', and 'created_at'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README

### POST `/api/articles/1/comments`

Assertion: expected undefined to equal 0

Hints:

- default `votes` to `0` in the migrations
- default `created_at` to the current time in the migrations

### POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 1

Hints:

- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 17

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
