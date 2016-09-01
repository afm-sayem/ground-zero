const findQuery = require('objection-find');
const searchFilter = require('../../components/filters/text-search');
const utilities = require('../../components/utilities');

class BaseController {
  constructor(model, id = 'id', eager) {
    this.model = model;
    this.eager = eager;
    this.id = id;
  }

  create(req, res) {
    return this.model.query()
      .insert(req.body)
      .then(item => utilities.responseHandler(null, res, 201, item))
      .catch(err => utilities.responseHandler(err, res));
  }

  update(req, res) {
    return this.model.query()
      .patchAndFetchById(req.params[this.id], req.body)
      .then(item => utilities.responseHandler(null, res, 200, item))
      .catch(err => utilities.responseHandler(err, res));
  }

  index(req, res) {
    return findQuery(this.model)
      .allowEager(this.eager)
      .registerFilter('search', searchFilter)
      .build(req.query.where)
      .eager(req.query.include)
      .orderBy(req.query.sort.by, req.query.sort.order)
      .page(req.query.page.number, req.query.page.size)
      .then(items => utilities.responseHandler(null, res, 200, items))
      .catch(err => utilities.responseHandler(err, res));
  }

  show(req, res) {
    return this.model.query()
      .findById(req.params[this.id])
      .allowEager(this.eager)
      .eager(req.query.eager)
      .then(item => {
        if (!item) return utilities.throwNotFound(res);
        return utilities.responseHandler(null, res, 200, item);
      })
    .catch(err => utilities.responseHandler(err, res));
  }

  destroy(req, res) {
    return this.model.query()
      .deleteById(req.params[this.id])
      .then(() => utilities.responseHandler(null, res, 204))
      .catch(err => utilities.responseHandler(err, res));
  }
}

module.exports = BaseController;
