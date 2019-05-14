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
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe('/api/topics', () => {
    it('GET status:200 - returns all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });

  describe('/apis/articles', () => {
    it('GET status:200 - returns all the articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'count'
          );
        });
    });
  });

  describe('/api/articles?sort_by=article_id', () => {
    it('GET status:200 - returns all the articles sorted by the given query', () => {
      return request(app)
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy('article_id');
        });
    });
  });
});
