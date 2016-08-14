const hooks = require('hooks');
const assert = require('chai').assert;

hooks.before('GET /persons -> 200', (test, done) => {
  done();
});

hooks.after('GET /persons -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /persons -> 201', (test, done) => {
  done();
});

hooks.after('POST /persons -> 201', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /persons/{personId} -> 200', (test, done) => {
  test.request.params = {
    personId: 1,
  };
  done();
});

hooks.after('GET /persons/{personId} -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /persons/{personId}/movies -> 200', (test, done) => {
  test.request.params = {
    personId: 1,
  };
  done();
});

hooks.after('GET /persons/{personId}/movies -> 200', (test, done) => {
  test.request.params = {
    personId: 1,
  };
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /persons/{personId}/movies -> 201', (test, done) => {
  test.request.params = {
    personId: 1,
  };
  done();
});

hooks.after('POST /persons/{personId}/movies -> 201', (test, done) => {
  test.request.params = {
    personId: 1,
  };
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /persons/{personId}/movies/{movieId} -> 200', (test, done) => {
  test.request.params = {
    personId: 1,
    movieId: 1,
  };
  done();
});

hooks.after('GET /persons/{personId}/movies/{movieId} -> 200', (test, done) => {
  done();
});

