'use strict';

const Model = require('objection').Model;

class Type extends Model {
  static get tableName() {
    return 'Type';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: {type: 'integer'},
        name: {type: 'string', minLength: 1, maxLength: 255}
      }
    };
  }

}

module.exports = Type;
