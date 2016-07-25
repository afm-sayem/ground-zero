require('dotenv').config();
module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 7,
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },
};
