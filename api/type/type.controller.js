const Type = require('./type.model');
const utilities = require('../../components/utilities');
const findQuery = require('objection-find');

function create(req, res) {
  return Type.query()
    .insert(req.body)
    .then(type => utilities.responseHandler(null, res, 201, type))
    .catch(err => utilities.responseHandler(err, res));
}

function update(req, res) {
  return Type.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(type => utilities.responseHandler(null, res, 200, type))
    .catch(err => utilities.responseHandler(err, res));
}

function index(req, res) {
  return findQuery(Type)
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .where('id', req.params.id)
    .then(types => utilities.responseHandler(null, res, 200, types))
    .catch(err => utilities.responseHandler(err, res));
}

function show(req, res) {
  return Type.query()
    .where('id', req.params.id)
    .then(type => {
      if (!type) utilities.throwNotFound(res);
      return utilities.responseHandler(null, res, 200, type);
    })
    .catch(err => utilities.responseHandler(err, res));
}

function destroy(req, res) {
  return Type.query()
    .delete()
    .where('id', req.params.id)
    .then(() => utilities.responseHandler(null, res, 204))
    .catch(err => utilities.responseHandler(err, res));
}

module.exports = { create, update, index, show, destroy };
