exports.seed = function(knex, Promise) {
  return Promise.all([
      knex('Movie').del(),
  ]).then(
    Promise.all([
      knex('Type').del(),
      knex('Person').del()
    ]))
    .then(() =>
    Promise.all([
      knex('Person').insert({id: 1, name: 'Satyajit Ray'}),
      knex('Type').insert({id: 1, name: 'Drama'})
    ])).then(() => 
    Promise.all([
    knex('Movie').insert({id: 1, title: 'Pather Panchali', poster: 'pather_panchali.jpg', directorId: 1, typeId: 1})
    ]));
};
