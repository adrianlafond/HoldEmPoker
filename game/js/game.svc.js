;(function (ng, app) {
  'use strict'

  app.value('players', [
    { name: 'Human', id: 'human', seated: 6, chips: 100, cards: [] },
    { name: 'Eamon', id: 'eamon', seated: 0, chips: 100, cards: [] },
    { name: 'Elizabeth', id: 'elizabeth', seated: 0, chips: 100, cards: [] },
    { name: 'Falstaff', id: 'falstaff', seated: 0, chips: 100, cards: [] },
    { name: 'Hal', id: 'hal', seated: 0, chips: 100, cards: [] },
    { name: 'Bill', id: 'bill', seated: 0, chips: 100, cards: [] },
    { name: 'Bebop', id: 'bebop', seated: 0, chips: 100, cards: [] },
    { name: 'Sophie', id: 'sophie', seated: 0, chips: 100, cards: [] },
    { name: 'Tulip', id: 'tulip', seated: 0, chips: 100, cards: [] }
  ])

}(angular, GAME));
