const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('movies', {
  attributes: ['title', 'summary', 'poster', 'released', 'typeId', 'directorId', 'type', 'director'],
  type: {
    ref: (movie, type) => type? type.id: void 0
  },
  director: {
    ref: (movie, director) => director? director.id: void.0
  }
});
