const utilities = require('../utilities');

function hasPermission(permissionData, req, res, next) {
  if (req.user.role === 'admin') return next();

  if (!(req.params[permissionData.resourceId] || permissionData.userKey)) {
    return res.status(403).send({ message: 'You dont have permission to access this resource' });
  }

  return permissionData.model.query()
    .skipUndefined()
    .findById(req.params[permissionData.resourceId])
    .then((resource) => {
      if (!resource) {
        if (!resource) return utilities.throwNotFound(res);
      }

      if (resource[permissionData.userKey] === req.user.id) {
        return next();
      }

      return res.status(403).send({ message: 'You dont have permission to access this resource' });
    });
}

module.exports = hasPermission;
