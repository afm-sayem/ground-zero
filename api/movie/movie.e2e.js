const hooks = require('hooks');
const assert = require('chai').assert;

hooks.before('GET /movies -> 200', (test, done) => {
  done();
});

hooks.after('GET /movies -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /movies -> 201', (test, done) => {
  done();
});

hooks.after('POST /movies -> 201', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /movies/{movieId} -> 200', (test, done) => {
  test.request.params = {
    movieId: 1,
  };
  done();
});

hooks.after('GET /movies/{movieId} -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /movies/{movieId}/artists -> 200', (test, done) => {
  test.request.params = {
    objectId: 1,
  };
  done();
});

hooks.after('GET /movies/{movieId}/artists -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /movies/{movieId}/artists -> 201', (test, done) => {
  test.request.params = {
    movieId: 1,
  };
  done();
});

hooks.after('POST /movies/{movieId}/artists -> 201', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /movies/{movieId}/artists/{artistId} -> 200', (test, done) => {
  test.request.params = {
    movieId: 1,
    artistId: 1,
  };
  done();
});

hooks.after('GET /movies/{movieId}/artists/{artistId} -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /movies/{movieId}/reviews -> 200', (test, done) => {
  test.request.params = {
    movieId: 1,
  };
  done();
});

hooks.after('GET /movies/{movieId}/reviews -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /movies/{movieId}/reviews -> 201', (test, done) => {
  done();
});

hooks.after('POST /movies/{movieId}/reviews -> 201', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /movies/{movieId}/reviews/{reviewId} -> 200', (test, done) => {
  test.request.params = {
    movieId: 1,
    reviewId: 1,
  };
  done();
});

hooks.after('GET /movies/{movieId}/reviews/{reviewId} -> 200', (test, done) => {
  done();
});

