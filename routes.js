const movies = require('./api/movie');
const persons = require('./api/person');
const types = require('./api/type');
const users = require('./api/user');
const auth = require('./auth');
const signedUrl = require('./components/signing');

module.exports = (app) => {
  app.use('/movies', movies);
  app.use('/persons', persons);
  app.use('/types', types);
  app.use('/users', users);

  app.get('/components/get_signed_url', signedUrl);
  app.use('/auth', auth);

  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
      next();
    }
  });
};
