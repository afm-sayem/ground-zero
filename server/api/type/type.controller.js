const Type = require('./type.model');
const responseHandler = require('../../components/utilities').responseHandler;
const findQuery = require('objection-find');

exports.create = function (req, res) {
  Type.query()
    .insert(req.body)
    .then(type => responseHandler(null, res, 201, type))
    .catch(err => responseHandler(err, res));
};

exports.update = function (req, res) {
  Type.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(type => responseHandler(null, res, 200, type))
    .catch(err => responseHandler(err, res));
};

exports.index = function (req, res) {
  findQuery(Type)
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .where('id', req.params.id)
    .then(types => responseHandler(null, res, 200, types))
    .catch(err => responseHandler(err, res));
};

exports.show = function (req, res) {
  Type.query()
    .where('id', req.params.id)
    .then(type => responseHandler(null, res, 200, type))
    .catch(err => responseHandler(err, res));
};

exports.destroy = function (req, res) {
  Type.query()
    .delete()
    .where('id', req.params.id)
    .then(() => responseHandler(null, res, 204))
    .catch(err => responseHandler(err, res));
};
