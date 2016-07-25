const path = require('path');
const Model = require('objection').Model;
const schema = require('./movie.schema.json');

class Movie extends Model {
  static get tableName() {
    return 'Movie';
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../type/type.model`),
        join: {
          from: 'Movie.typeId',
          to: 'Type.id',
        },
      },
      director: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../person/person.model`),
        join: {
          from: 'Movie.directorId',
          to: 'Person.id',
        },
      },
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: path.normalize(`${__dirname}/../person/person.model`),
        join: {
          from: 'Movie.id',
          through: {
            from: 'Person_Movie.movieId',
            to: 'Person_Movie.personId',
            extra: ['character'],
          },
          to: 'Person.id',
        },
      },
    };
  }
}

module.exports = Movie;
