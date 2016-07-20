const Type = require('./type.model');
const responseHandler = require('../../components/utilities').responseHandler;
const findQuery = require('objection-find');

function create(req, res) {
  return Type.query()
    .insert(req.body)
    .then(type => responseHandler(null, res, 201, type))
    .catch(err => responseHandler(err, res));
}

function update(req, res) {
  return Type.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(type => responseHandler(null, res, 200, type))
    .catch(err => responseHandler(err, res));
}

function index(req, res) {
  return findQuery(Type)
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .where('id', req.params.id)
    .then(types => responseHandler(null, res, 200, types))
    .catch(err => responseHandler(err, res));
}

function show(req, res) {
  return Type.query()
    .where('id', req.params.id)
    .then(type => {
      if (!type) responseHandler(new Error('Not found'), res, 404);
      return responseHandler(null, res, 200, type);
    })
    .catch(err => responseHandler(err, res));
}

function destroy(req, res) {
  return Type.query()
    .delete()
    .where('id', req.params.id)
    .then(() => responseHandler(null, res, 204))
    .catch(err => responseHandler(err, res));
}

module.exports = { create, update, index, show, destroy };
