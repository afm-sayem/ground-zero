const Model = require('objection').Model;
const config = require('../../config/environment');
const path = require('path');

class Movie extends Model {
  static get tableName() {
    return 'Movie';
  }

  get posterUrl() {
    return `http://s3-${config.aws.region}.amazonaws.com/${config.aws.bucket}/posters/${this.poster}`;
  }

  $formatJson(obj) {
    const formattedObj = super.$formatJson(obj);
    formattedObj.poster = this.posterUrl;
    return formattedObj;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'directorId', 'typeId'],

      properties: {
        id: { type: 'integer' },
        directorId: { type: 'integer' },
        typeId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        summary: { type: 'string' },
        poster: { type: 'string', minLength: 1, maxLength: 255 },
        released: { type: 'date', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.normalize(`${__dirname}/../type/type.model'`),
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
      actors: {
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
