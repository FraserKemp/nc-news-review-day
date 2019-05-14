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
        });
    });
  });

  describe('/api/articles?topic=mitch', () => {
    it('GET status:200 - returns all the topics that belong to that topic given in the query', () => {
      return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.lengthOf(11);
          expect(body.articles[0].topic).to.eql('mitch');
          expect(body.articles[4].topic).to.eql('mitch');
          expect(body.articles[8].topic).to.eql('mitch');
        });
    });
  });
});
