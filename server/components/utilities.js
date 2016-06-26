function responseHandler(error, response, status, object, meta) {
  if (error) {
    return response.status(400).send({error: error});
  }
  if (object === void 0) {
    return response.status(404).send({message: 'Not Found'});
  }
  let json;
  try {
    json = this.serialize(object);
    json.meta = meta;
  } catch (e) {
    return response.status(422).send({error: e});
  }
  return response.status(status || 200).send(json);
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

