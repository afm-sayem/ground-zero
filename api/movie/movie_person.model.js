const path = require('path');
const Model = require('objection').Model;
const schema = require('./movie_person.schema.json');

class MoviePerson extends Model {
  static get tableName() {
    return 'movie_person';
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      movie: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../movie/movie.model`),
        join: {
          from: 'movie_person.movie_id',
          to: 'movie.id',
        },
      },
      person: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../person/person.model`),
        join: {
          from: 'movie_person.person_id',
          to: 'person.id',
        },
      },
    };
  }
}

module.exports = MoviePerson;
