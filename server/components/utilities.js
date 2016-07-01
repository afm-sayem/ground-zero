function responseHandler(error, response, status, data) {
  if (error === null && data === void 0) {
    return response.status(404).send({message: 'Not Found'});
  }
  if (error) {
    return response.status(status || 400).send({error: error});
  }
  return response.status(status || 200).send(data);
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

module.exports = {responseHandler, processQuery};

