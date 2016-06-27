exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('Movie').del()
  ]).then(Promise.all([
    knex('Type').del(),
    knex('Person').del()
  ]))
  .then(() => Promise.all([
    knex('Person').insert({id: 1, name: 'Satyajit Ray'}),
    knex('Person').insert({id: 2, name: 'Subir Banarjee'}),
    knex('Person').insert({id: 3, name: 'Kanu Banarjee'}),
    knex('Person').insert({id: 4, name: 'Ritwik Ghatak'}),
    knex('Person').insert({id: 5, name: 'Kali Banarjee'}),

    knex('Type').insert({id: 1, name: 'Drama'}),
    knex('Type').insert({id: 2, name: 'Comedy'})
  ]))
  .then(() => Promise.all([ 
    knex('Movie').insert({id: 1, title: 'Pather Panchali', poster: 'pather_panchali.jpg', directorId: 1, typeId: 1}),
    knex('Movie').insert({id: 2, title: 'Aparijito', poster: 'aparajito.jpg', directorId: 1, typeId: 1}),
    knex('Movie').insert({id: 3, title: 'Goopy Gyne Bagha Byne', poster: 'goopy_bagha.jpg', directorId: 1, typeId: 2}),
    knex('Movie').insert({id: 4, title: 'Meghe Dhaka Tara', poster: 'meghe_dhaka.jpg', directorId: 2, typeId: 1}),
    knex('Movie').insert({id: 5, title: 'Ajantrik', poster: 'ajantrik.jpg', directorId: 2, typeId: 2})
  ]));
};
