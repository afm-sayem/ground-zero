const path = require('path');
const Model = require('objection').Model;
const schema = require('./person.schema.json');

class Person extends Model {
  static get tableName() {
    return 'person';
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationshipMappings() {
    return {
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: path.normalize(`${__dirname}/../movie/movie.model`),
        join: {
          from: 'person.id',
          through: {
            from: 'person_movie.person_id',
            to: 'person_movie.movie_id',
            extra: ['character'],
          },
          to: 'movie.id',
        },
      },
    };
  }
}

module.exports = Person;
