'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('users', {
  attributes: ['name', 'avatar']
});
