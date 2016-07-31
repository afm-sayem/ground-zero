[![Dependency Status](https://david-dm.org/afm-sayem/api-server-seed.svg)](https://david-dm.org/afm-sayem/api-server-seed)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)

API seed project put together using Express, [ObjectionJS](https://github.com/Vincit/objection.js) and PostgreSQL.

Try the api with [sample requests](https://github.com/afm-sayem/api-server-seed/wiki/Sample-API-Requests)

####Features:

- Authentication
- User verification
- Full-text search
- Email
- Worker
- API Docs using RAML specification
- File uploading

###Prerequisites:

 - Install [nvm](https://github.com/creationix/nvm) and then `nvm install node`.
 - Add `node_modules` to your path variable. For example, for `zsh`, add this to your `.zshrc`: `export PATH="$PATH:./node_modules/.bin"`
 - Install project dependencies: `npm install`
 - Install [PostgreSQL](https://www.postgresql.org/download/) and create a database.
 - Install [redis](http://redis.io)
 - Create an environment variable configuration file named `.env` in the project root and define the environment variables. Here's a [sample](https://gist.github.com/afm-sayem/b000849ffa2f38169c73d2c9bb165bc0).
 - Create tables: `knex migrate:latest`
 - Populate tables with data: `knex seed:run`
 - Run the server: `npm run dev`
 - Test the API: http://localhost:3000/movies
 
 ###Common query parameters:

 To generate and read the api documentation, run `npm run doc` and access `http://localhost:8898` from your browser
 
 - All the resource endpoints(eg; /api/movies) accept the following query parameters: `where`, `include`, `page` and `sort`
 - `where` is used query a resource end point to get the list of desired resources. For instance, to get a list of movies where dierctorId is 1, your query would look like: `/api/movies?where[directorId:eq]=1`. The filter query format is followed by patterns listed in [objection-find](https://github.com/vincit/objection-find) package.
 - `include` is used to get relationship data of a resource. For example, to get the director information of the movies included in the movie list, the query would look like: `/api/movies?include=[director]`. You can request to add multiple information together. For example, to include both the movie type and it's director to the movies list, your request would look like: `/api/movies?include=[director,type]`
 - `page` is used for paging the documents. By default, if no `page[size]` is mentioned, it'll return 10 documents. To skip to a different page you need to define `page[number]`
 - `sort` is responsible for sorting by a key. By default, if no sort order is mentioned, the returned data will be sorted by id in descending order. To sort movies by a directorId in descending order, your request would look like, `/api/movies?sort=-directorId`

