process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiSorted = require('chai-sorted');
const { expect } = chai;
chai.use(chaiSorted);

const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).to.contain.keys(
            'topics',
            'articles',
            'comments',
            'users'
          );
        });
    });
  });

  describe('/topics', () => {
    describe('/api/topics', () => {
      it('GET status:200 - returns all topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0]).to.contain.keys('slug', 'description');
            expect(body.topics).to.have.lengthOf(3);
          });
      });
    });

    describe('/api/topics/:theTopic', () => {
      it('GET status:200 - returns true if the topic exists', () => {
        return request(app)
          .get('/api/topics/paper')
          .expect(200)
          .then(({ body }) => {
            expect(body.topic).to.contain.keys('slug', 'description');
          });
      });
    });
    describe('/api/topics', () => {
      it('POST status:200 - returns the new topic that is to be posted', () => {
        return request(app)
          .post('/api/topics')
          .send({ description: 'hello topic', slug: 'apples' })
          .expect(200)
          .then(({ body }) => {
            expect(body.topic).to.contain.keys('description', 'slug');
          });
      });
    });
  });

  describe('/articles', () => {
    describe('/apis/articles', () => {
      it('GET status:200 - returns all the articles', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              'article_id',
              'title',
              'votes',
              'topic',
              'author',
              'created_at',
              'comment_count'
            );
            expect(body.articles[1]).to.contain.keys(
              'article_id',
              'title',
              'votes',
              'topic',
              'author',
              'created_at',
              'comment_count'
            );
          });
      });
    });

    describe('/articles', () => {
      it('GET status:200 - returns only 10 articles', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.lengthOf(10);
          });
      });
    });

    describe('/articles', () => {
      it('POST status:200 - returns newly posted article', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'WOWZA',
            body: 'da best article ever',
            topic: 'cats',
            username: 'lurker'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
              'title',
              'body',
              'topic',
              'article_id',
              'author',
              'created_at',
              'votes'
            );
          });
      });
    });

    describe('/articles', () => {
      it('GET status:200 - returns the amount of articles on the second page', () => {
        return request(app)
          .get('/api/articles?p=2')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.lengthOf(2);
          });
      });
    });

    describe('/articles', () => {
      it('GET - returns status:200 - returns all the articles as a key of total_count', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.contain.keys('articles', 'total_count');
          });
      });
    });

    describe('/api/articles?sort_by=article_id', () => {
      it('GET status:200 - returns all the articles sorted by the given query', () => {
        return request(app)
          .get('/api/articles?sort_by=article_id')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('article_id');
          });
      });
    });

    describe('/api/articles?order=desc', () => {
      it('GET status:200 - returns all the articles sorted by their default value in desc order', () => {
        return request(app)
          .get('/api/articles?order=desc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('created_at');
          });
      });
    });

    describe('/api/articles?sort_by=article_id&order=asc', () => {
      it('GET status:200 - returns all the articles sorted by their article_id in acending order', () => {
        return request(app)
          .get('/api/articles?sort_by=article_id&order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy('article_id');
          });
      });
    });

    describe('/api/articles?author=butter_bridge', () => {
      it('GET status:200 - returns all the articles that belong to the author given in the query', () => {
        return request(app)
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.lengthOf(3);
            expect(body).to.contain.keys('articles', 'total_count');
          });
      });
    });

    describe('/api/articles?topic=mitch', () => {
      it('GET status:200 - returns all the topics that belong to that topic given in the query', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.lengthOf(10); // mitch has 11 articles but the limit is 10 so only 10 will be shown
            expect(body.articles[0].topic).to.eql('mitch');
            expect(body.articles[4].topic).to.eql('mitch');
            expect(body.articles[8].topic).to.eql('mitch');
            expect(body).to.contain.keys('articles', 'total_count');
          });
      });
    });

    describe('/api/articles/:article_id', () => {
      it('GET status:200 - returns the articles that match the given article_id in the query, 1 in this case', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
              'article_id',
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at',
              'comment_count'
            );
          });
      });
    });

    describe('/api/articles/:article_id', () => {
      it('PATCH status:200 - returns the article that has been patched', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({
            inc_votes: 1
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
              'article_id',
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at'
            );
            expect(body.article.votes).to.eql(101);
          });
      });
      it('PATCH status:200 - returns the article when nothing is passed to patch', () => {
        return request(app)
          .patch('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
              'article_id',
              'title',
              'body',
              'votes',
              'topic',
              'author',
              'created_at'
            );
            expect(body.article.votes).to.eql(100);
          });
      });
    });

    describe('/api/articles/:article_id/comments', () => {
      it('GET status:200 - returns all the comments that belong to a given article_id', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.have.lengthOf(10);
          });
      });
    });

    describe('/api/articles/:article_id/comments', () => {
      it('GET status:200 - returns an empty array when an article has no comments', () => {
        return request(app)
          .get('/api/articles/2/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.have.lengthOf(0);
            expect(body.comments).to.eql([]);
          });
      });
    });

    describe('/api/articles/:article_id/comments', () => {
      it('GET status:200 - returns 10 comments by the default limit of 10', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.have.lengthOf(10);
          });
      });
    });

    describe('/api/articles/:article_id/comments', () => {
      it('GET status:200 - Takes a query of p (page) which will get the next ', () => {
        return request(app)
          .get('/api/articles/1/comments?p=2')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.have.lengthOf(3);
          });
      });
    });

    describe('/api/articles/:article_id/comments?sort_by=comment_id', () => {
      it('GET status:200 - returns all the comments sorted by the given query', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=comment_id')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy('comment_id');
          });
      });
    });

    describe('/api/articles/:article_id/comments?order=asc', () => {
      it('GET status:200 - returns all the comments ordered by the given query', () => {
        return request(app)
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.ascendingBy('created_at');
          });
      });
    });

    describe('/api/articles/:article_id/comments', () => {
      it('POST status:201 - returns the comment that has been inserted', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 'butter_bridge',
            body: 'this is the best comment out there'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.contain.keys(
              'article_id',
              'author',
              'body',
              'comment_id',
              'created_at',
              'votes'
            );
          });
      });
    });
  });

  describe('/comments', () => {
    describe('/api/comments/:comment_id', () => {
      it('PATCH status:200 - returns the comment that has been patched', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.eql(17);
          });
      });
    });

    describe('/api/comments/:comment_id', () => {
      it('PATCH status:200 - returns the comment that has been patched', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.eql(16);
          });
      });
    });

    describe('/api/comments/:comment_id', () => {
      it('DELETE status:200 - returns an empty object as it has been deleted', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
          });
      });
    });
  });

  describe('/users', () => {
    describe('/api/users/:username', () => {
      it('GET status:200 - returns a user object containing all the data from the given user', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.contain.keys('username', 'avatar_url', 'name');
          });
      });
    });
    describe('/api/users', () => {
      it('GET status:200 = returns an object containing all the users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(({ body }) => {
            expect(body.users).to.have.lengthOf(4);
          });
      });
    });
    describe('/api/users', () => {
      it('POST status:200 - return the newly posted user', () => {
        return request(app)
          .post('/api/users')
          .send({ username: 'Mel', name: 'Fraser', avatar_url: 'bananas' })
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.contain.keys('username', 'name', 'avatar_url');
          });
      });
    });
  });

  describe('Error handeling', () => {
    describe('/not_a_route', () => {
      it('Route Not Found status:404 - returns a message of route not found when an incorrect route is given', () => {
        return request(app)
          .get('/not_a_route')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.eql('Route Not Found');
          });
      });
    });

    describe('Sending a request method that isnt allowed to a router', () => {
      describe('topicsRouter', () => {
        it('returns status:405 - when passed a method that isnt set up on the route "/api/topics"', () => {
          return request(app)
            .put('/api/topics')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
        it('returns status:405 - when passed a method that isnt set up on the route "/api/topics"', () => {
          return request(app)
            .put('/api/topics/mitch')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
      });
      describe('articlesRouter', () => {
        it('returns status:405 - when passed a method that isnt set up on the route "/api/articles"', () => {
          return request(app)
            .put('/api/articles')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
        it('returns status:405 - when passed a method that isnt set up on the route "/api/articles/:article_id"', () => {
          return request(app)
            .put('/api/articles/4')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
        it('returns status:405 - when passed a method that isnt set up on the route "/api/articles/:article_id/comments"', () => {
          return request(app)
            .put('/api/articles/4/comments')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
      });
      describe('commentsRouter', () => {
        it('returns status:405 - when passed a method that isnt set up on the route "/api/comments/:comment_id"', () => {
          return request(app)
            .put('/api/comments/1')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
      });

      describe('usersRouter', () => {
        it('returns status - 405 when passed a method that isnt set up on the route "/api/users/:username"', () => {
          return request(app)
            .put('/api/users/mitch')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.eql('Method Not Allowed');
            });
        });
      });
    });

    describe('/topics', () => {
      describe('GET a topic that doesnt exist', () => {
        it('returns status 404 - GET - when passed a topic that does not exist', () => {
          return request(app)
            .get('/api/topics/notATopic')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Topic does not exist');
            });
        });
      });
      describe('POST no topic given to POST', () => {
        it('returns status 400 - POST - when passed no body', () => {
          return request(app)
            .post('/api/topics')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect Format');
            });
        });
      });
      describe('POST topic is given but incorrect values', () => {
        it('return status 400 - POST - when passed incorrect values', () => {
          return request(app)
            .post('/api/topics')
            .send({ description: 'hello', slug: null })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect Format');
            });
        });
      });
    });

    describe('/articles', () => {
      describe('Sorting a table by a key that doesnt exist', () => {
        it('returns status 404 - GET - Column does not exist when passed an invalid column', () => {
          return request(app)
            .get('/api/articles?sort_by=christymastime')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Column does not exist');
            });
        });
      });

      describe('posting a new Article with an incorrect format being sent', () => {
        it('returns status: 400 - POST - Incorrect Aricle Format', () => {
          return request(app)
            .post('/api/articles')
            .send({
              title: 'hello',
              body: 'hi there',
              username: null,
              topic: null
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect article format');
            });
        });
      });

      describe('posting a new Article with a part of the body missing', () => {
        it('returns status: 400 - POST - Incorrect Aricle Format', () => {
          return request(app)
            .post('/api/articles')
            .send({
              title: 'hello',
              body: 'hi there',
              topic: null
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect article format');
            });
        });
      });

      describe('posting a new Article with no body to send', () => {
        it('returns status: 400 - POST - Incorrect aricle aormat', () => {
          return request(app)
            .post('/api/articles')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect article format');
            });
        });
      });

      describe('Ordering a table by something other than asc/desc ', () => {
        it('returns status:400 - GET - invalid order query', () => {
          return request(app)
            .get('/api/articles?order=jingleBells')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Bad request!');
            });
        });
      });

      describe('GET all articles by a author that doesnt exist', () => {
        it('returns status 404 - GET - author does not exist when passed an invalid author', () => {
          return request(app)
            .get('/api/articles?author=NotAnAuthor')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Author does not exist');
            });
        });
      });

      describe('GET all articles by a author that does exist but has no articles', () => {
        it('returns status 200 - GET - returns an empty array as the author has no articles', () => {
          return request(app)
            .get('/api/articles?author=lurker')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.eql([]);
            });
        });
      });

      describe('GET all articles by a topic that doesnt exist', () => {
        it('returns status 404 - GET - author does not exist when passed an invalid author', () => {
          return request(app)
            .get('/api/articles?topic=NotATopic')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Topic does not exist');
            });
        });
      });

      describe('GET - Passsed an incorrect article_id to get the data from', () => {
        it('returns status:404 - GET - when an incorrect article_id is passed', () => {
          return request(app)
            .get('/api/articles/99999')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
        it('returns status:404 - GET - when an bad article_id is passed', () => {
          return request(app)
            .get('/api/articles/dog')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Invalid input syntax for interger');
            });
        });
      });

      describe(' PATCH - Passsed an incorrect article_id to patch the data from', () => {
        it('returns status:404 - PATCH - when an incorrect article_id is passed', () => {
          return request(app)
            .patch('/api/articles/9999')
            .send({ inc_votes: 5 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
      });

      describe('PATCH - Passsed and an invalid body to patch', () => {
        it('returns status:400 - PATCH - when an correct article_id is passed', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 'cat' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Bad Request! Body is not a number');
            });
        });
      });

      describe('PATCH - Passsed and a valid body to patch along with another key', () => {
        it('returns status:400 - PATCH - when another key is on the body', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 'cat', mitch: 'hello' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Bad Request! Body is not a number');
            });
        });
      });

      describe('GET - Passed an incorrect article_id to get a certain comment from that given id', () => {
        it('return status:404 - GET - when an in correct article_id is passed', () => {
          return request(app)
            .get('/api/articles/9999/comments')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
      });

      describe('GET - Passed an invalid article_id to get a certain comment from that given id', () => {
        it('return status:400 - GET - when an invalid article_id is passed', () => {
          return request(app)
            .get('/api/articles/cat/comments')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Invalid input syntax for interger');
            });
        });
      });

      describe('POST - Passed an incorrect article_id to post a new comment', () => {
        it('returns status:404 - POST - when an incorrect article_id is passed', () => {
          return request(app)
            .post('/api/articles/9999/comments')
            .send({ username: 'butter_bridge', body: 'wowza' })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
      });

      describe('POST - Passed an invalid article_id to post a new comment', () => {
        it('returns status:404 - POST - when an incorrect article_id is passed', () => {
          return request(app)
            .post('/api/articles/cat/comments')
            .send({ username: 'butter_bridge', body: 'wowza' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Invalid input syntax for interger');
            });
        });
      });

      describe('POST - Passed a correct article_id but passed a comment with an incorrect format', () => {
        it('returns status:400 - POST -when passed a correct article_id but an incorrect comment format', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ username: 'butter_bridge', body: null })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect comment format');
            });
        });
      });

      describe('POST - Passed a correct article_id but passed no comment to add', () => {
        it('returns status:400 - POST - when passed a correct article_id but no comment', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect comment format');
            });
        });
      });

      describe('POST - Passed a correct article_id but not passed a full comment', () => {
        it('returns status:400 - POST - when passed a correct article_id but not a full comment', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({ body: 'help me my username has gone' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect comment format');
            });
        });
      });
    });

    describe('/comments', () => {
      describe('PATCH - Passed an incorrect comment_id', () => {
        it('returns status:404 - PATCH - when passed an incorrect comment_id', () => {
          return request(app)
            .patch('/api/comments/9999')
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
      });

      describe('PATCH - Passed an invalid comment_id', () => {
        it('returns status:400 - PATCH - when passed an incorrect comment_id', () => {
          return request(app)
            .patch('/api/comments/cat')
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Invalid input syntax for interger');
            });
        });
      });

      describe('DELETE - Passed an incorrect comment_id', () => {
        it('returns status:404 - DELETE - when passed an incorrect comment_id', () => {
          return request(app)
            .delete('/api/comments/9999')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Id does not exist');
            });
        });
      });

      describe('DELETE - Passed an invalid comment_id', () => {
        it('returns status:400 - DELETE - when passed an invalid comment_id', () => {
          return request(app)
            .delete('/api/comments/cat')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Invalid input syntax for interger');
            });
        });
      });
    });

    describe('/users', () => {
      describe('GET - passed an incorrect username', () => {
        it('returns status 404 - GET - when passed an incorrect username', () => {
          return request(app)
            .get('/api/users/billybobbyboo')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.eql('Username does not exist');
            });
        });
      });
      describe('POST - passed an nothing to post', () => {
        it('returns status 400 - POST - when passed no body to send', () => {
          return request(app)
            .post('/api/users')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Incorrect Format');
            });
        });
      });
      describe('POST - passed incorrect values in the body', () => {
        it('returns status 400 - POST - when passed incorrect values', () => {
          return request(app)
            .post('/api/users')
            .send({ username: 'butter_bridge', name: null, article_url: null })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.eql('Column does not exist');
            });
        });
      });
    });
  });
});
