const User = require('./user.model');
const utilities = require('../../components/utilities');
const findQuery = require('objection-find');

function index(req, res) {
  return findQuery(User)
    .build(req.query.filter)
    .eager(req.query.include)
    .omit('hash')
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(users => utilities.responseHandler(null, res, 200, users))
    .catch(err => utilities.responseHandler(err, res));
}

function show(req, res) {
  return User.query()
    .findById(req.user)
    .omit('hash')
    .then(user => {
      if (!user) return utilities.throwNotFound(res);
      return utilities.responseHandler(null, res, 200, user);
    })
    .catch(err => utilities.responseHandler(err, res));
}

function update(req, res) {
  return User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.send(user));
}

function destroy(req, res) {
  return User.query()
    .delete()
    .where('id', req.params.id)
    .then(() => utilities.responseHandler(null, res, 204))
    .catch(err => utilities.responseHandler(err, res));
}

function unlink(req, res) {
  const provider = req.query.provider;

  const providers = ['facebook'];
  if (providers.indexOf(provider) === -1) {
    return res.status(404).send('Unknown provider');
  }

  return User.query()
    .findById(req.user)
    .update({ [provider]: null })
    .then((user) => {
      res.status(200).send(user);
    });
}

module.exports = { index, show, update, destroy, unlink };
