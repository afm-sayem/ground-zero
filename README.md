This is an API seed project put together using Express, [ObjectionJS](https://github.com/Vincit/objection.js) and PostgreSQL.

###Prerequisites:

 - Install [nvm](https://github.com/creationix/nvm) and then `nvm install node`.
 - Add `node_modules` to your path variable. For example for `zsh`, add this to your `.zshrc`: `export PATH="$PATH:./node_modules/.bin"`
 - Install project dependencies: `npm install`
 - Install [PostgreSQL](https://www.postgresql.org/download/) and create a database.
 - Create an environment variable configuration file named `.env` in the project root and define the environment variables. Here's a [sample](https://gist.github.com/afm-sayem/b000849ffa2f38169c73d2c9bb165bc0).
 - Create tables: `knex migrate:latest`
 - Populate tables with data: `knex seed:run`
 - Run the server: `npm run dev`
 - Check whether the API is running: http://localhost:3000/movies
 
 ###API Design guide:
 
 - All the resource endpoints(eg; /api/movies) accept the following query parameters: `where`, `include`, `page`, `sort` and `fields`
 - `where` is used query a resource end point to get the list of desired resources. For example, to get a list of movies where dierctorId is 1, your query would look like: `/api/movies?where[directorId:eq]=1`. The filter query format is followed by patterns listed in [objection-find](https://github.com/vincit/objection-find) package.
 - `include` is used to get relationship data of a resource. For example, to get the director information of the movies included in the movie list, the query would look like: `/api/movies?include=[director]`. You can request to add multiple information together, for example to include both the movie type and it's director to the movies list, your request would look like: `/api/movies?include=[director,type]`
 - `page` is used for paging the documents. By default, if no `page[size]` is mentioned, it'll return 10 documents. To skip to a different page you need to define `page[number]`
 - `sort` is responsible for sorting by a key. By default, if no sort order is mentioned, the returned data will be sorted by id in descending order. To sort movies by a directorId in descending order, your request would look like, `/api/movies?sort=-directorId`

 
 ###Development Environment:
 
  - [http-prompt](https://github.com/eliangcs/http-prompt) for convenient endpoint testing
  - [pgcli](https://github.com/dbcli/pgcli) for a better postgres cli.
