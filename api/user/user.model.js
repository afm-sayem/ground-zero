const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const Model = require('objection').Model;
const config = require('../../config/environment');
const schema = require('./user.schema.json');

class User extends Model {
  static get tableName() {
    return 'User';
  }

  get avatarUrl() {
    return `${config.facebook.graphAPI}/${this.facebook}/picture?type=large`;
  }

  $formatJson(obj) {
    const formattedObj = super.$formatJson(obj);
    formattedObj.avatar = this.avatarUrl;

    return formattedObj;
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
