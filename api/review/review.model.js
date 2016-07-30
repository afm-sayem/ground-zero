const Model = require('objection').Model;
const schema = require('./review.schema.json');

class Review extends Model {
  static get tableName() {
    return 'review';
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Review;
