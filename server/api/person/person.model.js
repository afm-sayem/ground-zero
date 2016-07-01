const Model = require('objection').Model;
const path = require('path');

class Person extends Model {
  static get tableName() {
    return 'Person';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: {type: 'integer'},
        name: {type: 'string', minLength: 1, maxLength: 255}
      }
    };
  }

  static get relationshipMappings () {
    return {
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: path.normalize(__dirname + '/../movie/movie.model'),
        join: {
          from: 'Person.id',
          through: {
            from: 'Person_Movie.personId',
            to: 'Person_Movie.movieId',
            extra: ['character']
          },
          to: 'Movie.id'
        }
      }
    };
  }
}

module.exports = Person;
