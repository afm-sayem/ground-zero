const hooks = require('hooks');
const assert = require('chai').assert;

hooks.before('GET /types -> 200', (test, done) => {
  done();
});

hooks.after('GET /types -> 200', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('POST /types -> 201', (test, done) => {
  done();
});

hooks.after('POST /types -> 201', (test, done) => {
  done();
});

//-----------------------------------------------------------------------------
hooks.before('GET /types/{typeId} -> 200', (test, done) => {
  test.request.params = {
    objectId: 1,
  };
  done();
});

hooks.after('GET /types/{typeId} -> 200', (test, done) => {
  done();
});

