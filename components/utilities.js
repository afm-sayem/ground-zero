const mailQueue = require('../config/queue').mailQueue;

function responseHandler(error, response, status, data) {
  if (error === null && data === void 0) {
    return response.status(404).send({message: 'Not Found'});
  }
  if (error) {
    return response.status(status || 500).send({error: error.message});
  }
  return response.status(status || 200).send(data);
}

function searchFilter(propertyRef, value, modelClass) {
  // https://github.com/Vincit/objection-find/blob/master/API.md
  var formatter = modelClass.formatter();
  // Always use `formatter.wrap` for column references when building raw queries.
  var columnName = formatter.wrap(propertyRef.fullColumnName());

  return {
    method: 'whereRaw',
    // Always escape the user input when building raw queries.
    // return values where the input is similar to the value of the column
    args: ['similarity(' + columnName +', ?) > 0.2', value.toLowerCase()]
  };
}

function processQuery(req, res, next) {
  function getPagination(page) {
    page = page? page: {};
    return {
      number: page.number || 0,
      size: page.size || 10
    };
  }
  function getOrder(sort) {
    let sortObj = {};
    if (sort) {
      sortObj.by = sort.startsWith('-')? sort.slice(1): sort;
      sortObj.order = sort.startsWith('-')? 'desc': 'asc';
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
  return mailQueue.add({
    from: from,
    to: to,
    subject: subject,
    html: content
  });
}

module.exports = {responseHandler, processQuery, searchFilter, sendMail};

