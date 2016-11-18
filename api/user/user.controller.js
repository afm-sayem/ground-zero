const User = require('./user.model');
const BaseController = require('../base/base.controller');
const utilities = require('../../components/utilities');
const findQuery = require('objection-find');

class UserController extends BaseController {
  constructor() {
    super(User, 'user_id');
    this.model = User;
  }

  index(req, res) {
    return findQuery(this.model)
      .build(req.query.filter)
      .skipUndefined()
      .eager(req.query.include)
      .omit('hash')
      .orderBy(req.query.sort.by, req.query.sort.order)
      .page(req.query.page.number, req.query.page.size)
      .then(users => utilities.responseHandler(null, res, 200, users))
      .catch(err => utilities.responseHandler(err, res));
  }

  show(req, res) {
    return this.model
      .query()
      .findById(req.user)
      .omit('hash')
      .then((user) => {
        if (!user) return utilities.throwNotFound(res);
        return utilities.responseHandler(null, res, 200, user);
      })
      .catch(err => utilities.responseHandler(err, res));
  }

  unlink(req, res) {
    const provider = req.query.provider;

    const providers = ['facebook'];
    if (providers.indexOf(provider) === -1) {
      return res.status(404).send('Unknown provider');
    }

    return this.model
      .query()
      .findById(req.user)
      .update({ [provider]: null })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(err => utilities.responseHandler(err, res));
  }
}

module.exports = UserController;
