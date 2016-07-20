const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const Model = require('objection').Model;
const config = require('../../config/environment');

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
    return {
      type: 'object',
      required: ['email'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        hash: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        facebook: { type: 'string', minLength: 1, maxLength: 255 },
        google: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
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
