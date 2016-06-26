const Person = require('./person.model');
const PersonSerializer = require('./person.serializer');
const responseHandler = require('../../components/utilities').responseHandler.bind(PersonSerializer);
const findQuery = require('objection-find');

exports.create = function (req, res) {
  Person.query()
    .insert(req.body)
    .then(person => responseHandler(null, res, 201, person))
    .catch(err => responseHandler(err, res));
};

exports.update = function (req, res) {
  Person.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(person => responseHandler(null, res, 200, person))
    .catch(err => responseHandler(err, res));
};

exports.index = function (req, res) {
  findQuery(Person)
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(persons => responseHandler(null, res, 200, persons.results, {total: persons.total}))
    .catch(err => responseHandler(err, res));
};

exports.show = function (req, res) {
  Person.query()
    .where('id', req.params.id)
    .then(person => responseHandler(null, res, 200, person))
    .catch(err => responseHandler(err, res));
};

exports.destroy = function (req, res) {
  Person.query()
    .delete()
    .where('id', req.params.id)
    .then(() => responseHandler(null, res, 204))
    .catch(err => responseHandler(err, res));
};

