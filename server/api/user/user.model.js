'use strict';

const Model = require('objection').Model;
const config = require('../../config/environment');

class User extends Model {
  static get tableName() {
    return 'User';
  }

  get avatarUrl() {
    return `${config.facebook.graphAPI}/${this.facebook}/picture?type=large`
  }

  $formatJson(obj) {
    obj = super.$formatJson(obj);
    obj.avatar = this.avatarUrl;

    return obj;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'facebook'],

      properties: {
        id: {type: 'integer'},
        name: {type: 'string', minLength: 1, maxLength: 255},
        facebook: {type: 'string', minLength: 1, maxLength: 255},
      }
    };
  }
}

module.exports = User;
