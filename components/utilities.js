const _ = require('lodash');
const mailQueue = require('../config/queue').mailQueue;

function getErrorStatus(err) {
  let errStatus = 500;
  if (err.name === 'error') {
    errStatus = 400;
  }
  return errStatus;
}

function responseHandler(err, res, status, data) {
  // TODO: send response based on the error message
  if (err) {
    const errStatus = getErrorStatus(err);
    return res.status(err.statusCode || errStatus || 500)
      .send(_.pickBy({ err: `${err.message}`, hint: `${err.hint || ''}` }));
  }
  return res.status(status || 200).send(data);
}

function searchFilter(propertyRef, value, modelClass) {
  // https://github.com/Vincit/objection-find/blob/master/API.md
  const formatter = modelClass.formatter();
  // Always use `formatter.wrap` for column references when building raw queries.
  const columnName = formatter.wrap(propertyRef.fullColumnName());

  return {
    method: 'whereRaw',
    // Always escape the user input when building raw queries.
    // return values where the input is similar to the value of the column
    args: [`similarity(${columnName}, ?) > 0.2`, value.toLowerCase()],
  };
}

function throwNotFound(res) {
  const error = new Error('Not found');
  error.statusCode = 404;
  return responseHandler(error, res);
}

function processQuery(req, res, next) {
  function getPagination(pageVal) {
    const page = pageVal || {};
    return {
      number: page.number || 0,
      size: page.size || 10,
    };
  }
  function getOrder(sort) {
    const sortObj = {};
    if (sort) {
      sortObj.by = sort.startsWith('-') ? sort.slice(1) : sort;
      sortObj.order = sort.startsWith('-') ? 'desc' : 'asc';
    } else {
      // default
      sortObj.order = 'id';
      sortObj.order = 'desc';
    }
    return sortObj;
  }
  req.query.page = getPagination(req.query.page);
  req.query.sort = getOrder(req.query.sort);
  next();
}

function sendMail(to, from, subject, content) {
  return mailQueue.add({ from, to, subject, html: content });
}

module.exports = { responseHandler, processQuery, searchFilter, sendMail, throwNotFound };
