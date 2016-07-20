exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('Movie').del()
  ]).then(Promise.all([
    knex('Type').del(),
    knex('Person').del()
  ]))
  .then(() => Promise.all([
    knex('Person').insert({name: 'Satyajit Ray'}),
    knex('Person').insert({name: 'Subir Banarjee'}),
    knex('Person').insert({name: 'Kanu Banarjee'}),
    knex('Person').insert({name: 'Ritwik Ghatak'}),
    knex('Person').insert({name: 'Kali Banarjee'}),

    knex('Type').insert({name: 'Drama'}),
    knex('Type').insert({name: 'Comedy'})
  ]))
  .then(() => Promise.all([ 
    knex('Movie').insert({title: 'Pather Panchali', poster: 'pather_panchali.jpg', directorId: 1, typeId: 1}),
    knex('Movie').insert({title: 'Aparijito', poster: 'aparajito.jpg', directorId: 1, typeId: 1}),
    knex('Movie').insert({title: 'Goopy Gyne Bagha Byne', poster: 'goopy_bagha.jpg', directorId: 1, typeId: 2}),
    knex('Movie').insert({title: 'Meghe Dhaka Tara', poster: 'meghe_dhaka.jpg', directorId: 2, typeId: 1}),
    knex('Movie').insert({title: 'Ajantrik', poster: 'ajantrik.jpg', directorId: 2, typeId: 2})
  ]));
};
