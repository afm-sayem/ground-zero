const hooks = require('hooks');
const assert = require('chai').assert;

hooks.before('GET /users -> 200', (test, done) => {
  // Modify 'test.request' properties here to modify the inbound request
  done();
});

hooks.after('GET /users -> 200', (test, done) => {
  // Assert against 'test.response' properties here to verify expected results
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /users/{userId} -> 200', (test, done) => {
  test.request.params = {
    userId: 1,
  };
  done();
});

hooks.after('GET /users/{userId} -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /users/{userId}/favorites -> 200', (test, done) => {
  done();
});

hooks.after('GET /users/{userId}/favorites -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /users/{userId}/favorites -> 201', (test, done) => {
  done();
});

hooks.after('POST /users/{userId}/favorites -> 201', (test, done) => {
  done();
});
