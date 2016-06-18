module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : '127.0.0.1',
      user     : 'kishan',
      password : 'jmjm',
      database : 'seed',
    },
    pool: {
      min: 0,
      max: 7
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
