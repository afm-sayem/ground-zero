const path = require('path');
const Model = require('objection').Model;
const schema = require('./person.schema.json');

class Person extends Model {
  static get tableName() {
    return 'Person';
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
          from: 'Person.id',
          through: {
            from: 'Person_Movie.personId',
            to: 'Person_Movie.movieId',
            extra: ['character'],
          },
          to: 'Movie.id',
        },
      },
    };
  }
}

module.exports = Person;
