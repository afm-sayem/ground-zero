const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('movies', {
  attributes: ['title', 'summary', 'poster', 'released', 'typeId', 'directorId', 'type', 'director'],
  type: {
    ref: 'id',
    attributes: ['name']
  },
  director: {
    ref: 'id',
    attributes: ['name']
  }
});
