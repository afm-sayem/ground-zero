'use strict';
require('objection').transaction;

module.exports = (app) => {
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/persons', require('./api/person'));
  app.use('/api/types', require('./api/type'));
  app.use('/api/users', require('./api/user'));

  app.get('/components/get_signed_url', require('./components/signing'));
  app.use('/auth', require('./auth'));

  app.use(function (err, req, res, next) {
    if (err) {
      res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
      next();
    }
  });

  app.route('/')
    .get((req, res) => {
      res.sendfile(app.get('appPath') + '/index.html');
    });
}
