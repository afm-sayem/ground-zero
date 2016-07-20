const Person = require('./person.model');
const responseHandler = require('../../components/utilities').responseHandler;
const findQuery = require('objection-find');

function create(req, res) {
  Person.query()
    .insert(req.body)
    .then(person => responseHandler(null, res, 201, person))
    .catch(err => responseHandler(err, res));
}

function update(req, res) {
  Person.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(person => responseHandler(null, res, 200, person))
    .catch(err => responseHandler(err, res));
}

function index(req, res) {
  findQuery(Person)
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(persons => responseHandler(null, res, 200, persons))
    .catch(err => responseHandler(err, res));
}

function show(req, res) {
  Person.query()
    .where('id', req.params.id)
    .then(person => {
      if (!person) responseHandler(new Error('Not found'), res, 404);
      responseHandler(null, res, 200, person);
    })
    .catch(err => responseHandler(err, res));
}

function destroy(req, res) {
  Person.query()
    .delete()
    .where('id', req.params.id)
    .then(() => responseHandler(null, res, 204))
    .catch(err => responseHandler(err, res));
}

module.exports = { create, update, index, show, destroy };

