[![Dependency Status](https://david-dm.org/afm-sayem/api-server-seed.svg)](https://david-dm.org/afm-sayem/api-server-seed)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://opensource.org/licenses/MIT)

Ground Zero is a collection of features implemented on top of Express with the help of [ObjectionJS](https://github.com/Vincit/objection.js) and PostgreSQL. The API stores and serves data for a movie review site.

Play with the API with some [sample requests](https://github.com/afm-sayem/api-server-seed/wiki/Sample-API-Requests).

### Features:

- User registration with verification
- Token based authentication
- Permissions
- Dynamic query filters
- Full-text search
- Geolocation
- Browsable API documentation
- *Planned*: Recommendations

### API Design:
The filtering API is using [objection-find](http://github.com/vincit/objection-find) which exposes a powerful queryable API to the consumers. The API consumer can dynamcally filter on the properties of any resource they have access to without a single modification done to the server.

All query parameters are grouped in four classes: filters, pagination, inclusions and ordering. There's an excellent discussion in [one of the issues in Ghost](https://github.com/TryGhost/Ghost/issues/5463) where they discuss implementing this pattern to let the consumers access the API easily.

### Getting started:

 - Install [nvm](https://github.com/creationix/nvm) and then `nvm install node` (*minimum version: 7.x*).
 - Add `node_modules` to your path variable. For example, for `zsh`, add this to your `.zshrc`: `export PATH="$PATH:./node_modules/.bin"`
 - Install project dependencies: `npm install`
 - Install [PostgreSQL](https://www.postgresql.org/download/) and create a database.
 - Install [redis](http://redis.io)
 - Create an environment variable configuration file named `.env` in the project root and define the environment variables. Here's a [sample](https://gist.github.com/afm-sayem/b000849ffa2f38169c73d2c9bb165bc0).
 - Create tables: `knex migrate:latest`
 - Populate tables with data: `knex seed:run`
 - Run the server: `npm run dev`
 - Test the API: http://localhost:3000/movies

