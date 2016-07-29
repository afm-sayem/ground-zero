const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const Model = require('objection').Model;
const config = require('../../config/environment');
const schema = require('./user.schema.json');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get virtualAttributes() {
    return ['avatar'];
  }

  get avatar() {
    if (this.facebook) {
      return `${config.facebook.graphAPI}/${this.facebook}/picture?type=large`;
    }
    return undefined;
  }

  static get jsonSchema() {
    return schema;
  }

  /* Actions */
  authenticate(plainText) {
    return bcrypt.compareAsync(plainText, this.hash);
  }

  static encryptPassword(password, saltRounds = 10) {
    return bcrypt.hashAsync(password, saltRounds);
  }

}

module.exports = User;
