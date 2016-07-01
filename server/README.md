The backend uses express framework with objectionJS as it's ORM. The database is in PostgreSQL.

Prerequisites:
 - Install nvm and using nvm install nodeJS 6.x.
 - Install `knex` and `nodemon` from npm globally: `npm install
 - Install project dependencies: `npm install`
 - Install PostgreSQL.
 - Create a database and provide database connection information in knexfile.js
 - Create tables: `knex migrate:latest`
 - Populate tables with data: `knex seed:run`
 - Run the server: `nodemon`
 - Check whether the API is running: http://localhost:3000/api/movies

 API Design guide:
 - The API loosely follows JSON-API specification.
 - All the resource endpoint(eg; /api/movies) accepts the following query parameters: `filter`, `include`, `page`, `sort` and `fields`
 - `filter` is used query a resource end point to get the list of desired resources. For example, to get a list of movies where dierctorId is 1, your query would look like: /api/movies?filter[directorId]=1. The filter query format is followed by the [objection-find](https://github.com/vincit/objection-find) module.
 - `include` is used to get relationship data of a resource. For example, to get the director information of the movies included in the movie list, the query would look like: /api/movies?include=[director]. You can request to add multiple information together, for example to include both the movie type and it's director to the movies list, your request would look like: /api/movies?include=[director,type]
 - `page` is used for paging the documents. By default, if no page[size] is mentioned, it'll return 10 documents. To skip to a different page you need to define page[number]
 - `sort` is responsible for sorting by a key. By default, if no sort order is mentioned, the returned data will be sorted by id in descending order. To sort movies by a directorId in descending order, your request would look like, /api/movies?sort=-directorId


 Development Environment:
  - http-prompt is a very good command line rest client
  - Install pgsql for a better PostgreSQL command line interface.
