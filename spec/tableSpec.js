'use strict'


describe('Poker.Table', function () {
  var Poker = DISBRANDED.Poker,
      Table = Poker.Table,
      Player = Poker.Player

  it('should add and more players', function () {
    var table = new Table,
        p1 = new Player({ id: 'p1', chips: 1000 }),
        p2 = new Player({ id: 'p2', chips: 2500 }),
        p3 = new Player({ id: 'p3', chips: 3250 }),
        p4 = new Player({ id: 'p4', chips: 1725 }),
        p5 = new Player({ id: 'p5', chips: 963 }),
        p6 = new Player({ id: 'p6', chips: 458 })

    expect(table.options.seats).toBe(5)

    table.add(p1)
    expect(table.at(0).id).toBe('p1')

    table.add({ seat: 2, player: p2 })
    expect(table.at(1)).toBe(null)
    expect(table.at(2).id).toBe('p2')

    table.add({ player: p2 })
    expect(table.at(0).id).toBe('p1')
    expect(table.at(1).id).toBe('p2')
  })
})