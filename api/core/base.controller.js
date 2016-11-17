const findQuery = require('objection-find');
const searchFilter = require('../../components/filters/text-search');
const utilities = require('../../components/utilities');
const Promise = require('bluebird');

function getParameterFilters(req, filterProperties) {
  let paramFilter;
  if (filterProperties) {
    paramFilter = {};
    filterProperties.forEach((item) => {
      paramFilter[item.prop] = Number(req.params[item.prop]);
    });
  }
  return paramFilter;
}

async function isValidData(req, additionalProperties) {
  const data = additionalProperties.filter(value => value.checkExistence);
  try {
    const props = await Promise.map(data, (item) => {
      return item.model.query()
        .findById(Number(req.params[item.prop]));
    });
    if (props.some(item => item === undefined || item === null)) {
      return false;
    }
    return true;
  } catch (e) {
    /* handle error */
    return new Error('Error in looking up resources');
  }
}

function getAdditionalProperties(req, data) {
  const additionalProperties = {};
  data
    .filter(item => item.include)
    .forEach((item) => {
      additionalProperties[item.prop] = Number(req.params[item.prop]);
    });
  return additionalProperties;
}

class BaseController {
  constructor(model, id, additionalProperties, userField) {
    this.model = model;
    this.id = id;
    this.additionalProperties = additionalProperties;
    this.userField = userField;
  }

  async create(req, res) {
    let data = req.body;
    if (this.additionalProperties) {
      if (await isValidData(req, this.additionalProperties)) {
        data = Object.assign({}, data, getAdditionalProperties(req, this.additionalProperties));
      } else {
        return utilities.throwNotFound(res);
      }
    }

    if (this.userField) {
      data[this.userField] = req.user.id;
    }

    return this.model.query()
      .insert(data)
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
      .registerFilter('search', searchFilter)
      .build(req.query.where)
      .skipUndefined()
      .where(getParameterFilters(req, this.additionalProperties))
      .eager(req.query.include)
      .orderBy(req.query.sort.by, req.query.sort.order)
      .page(req.query.page.number, req.query.page.size)
      .then(items => utilities.responseHandler(null, res, 200, items))
      .catch(err => utilities.responseHandler(err, res));
  }

  show(req, res) {
    return this.model.query()
      .findById(req.params[this.id])
      .skipUndefined()
      .where(getParameterFilters(req, this.additionalProperties))
      .eager(req.query.eager)
      .then((item) => {
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
