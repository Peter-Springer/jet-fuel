const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('should return a 200 status code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET all urls at /api/v1/urls', () => {
  beforeEach(() => {
    app.locals.urls = [{ id: 1,
                         url: 'http://www.google.com',
                         shortURL: 'http://localhost:8080/view/8ey63p',
                         date: 'Nov 30th 2016, 8:00pm',
                         count: 4
                       }];
  });

  afterEach(() => {
    app.locals.urls = [];
  });

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/api/v1/urls')
      .expect(200, done);
  });

  it('should return a url stored in app.locals.urls', (done) => {
    request(app)
      .get('/api/v1/urls')
      .expect(200, app.locals.urls, done);
  });
});

describe('POST /api/v1/urls', () => {
  beforeEach(() => {
    app.locals.urls = [];
  });

  it('should create a new url', (done) => {
    const url = 'http://turing.io';

    request(app)
      .post('/api/v1/urls')
      .send({ url })
      .expect(201)
      .end(() => {
        assert.equal(app.locals.urls.length, 1);
        done();
      });
  });
  it('should return a 422 status code if incorrect url provided', (done) => {
    const url = 'htp';

    request(app)
      .post('/api/v1/urls')
      .send({ url })
      .expect(422);
        done();
   });
});
