const path = require('path');
const Model = require('objection').Model;
const schema = require('./movie.schema.json');

class Movie extends Model {
  static get tableName() {
    return 'movie';
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
          from: 'movie.type_id',
          to: 'type.id',
        },
      },
      director: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../person/person.model`),
        join: {
          from: 'movie.director_id',
          to: 'person.id',
        },
      },
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: path.normalize(`${__dirname}/../person/person.model`),
        join: {
          from: 'movie.id',
          through: {
            from: 'person_movie.movie_id',
            to: 'person_movie.person_id',
            extra: ['character'],
          },
          to: 'person.id',
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: path.normalize(`${__dirname}/../review/review.model`),
        join: {
          from: 'movie.id',
          to: 'review.movie_id',
        },
      },
    };
  }
}

module.exports = Movie;
