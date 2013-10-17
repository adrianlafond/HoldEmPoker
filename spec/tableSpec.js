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

    table.remove(p2)
    expect(table.at(1)).toBe(null)

    table.add(p2).add(p3).add(p4).add(p5)
    expect(table.at(2) instanceof Player).toBe(true)
    expect(table.at(0).id).toBe('p1')
    expect(table.at(1).id).toBe('p2')
    expect(table.at(2).id).toBe('p3')
    expect(table.at(3).id).toBe('p4')
    expect(table.at(4).id).toBe('p5')

    table.add(p6)
    expect(table.at(0).id).toBe('p1')
    expect(table.at(1).id).toBe('p2')
    expect(table.at(2).id).toBe('p3')
    expect(table.at(3).id).toBe('p4')
    expect(table.at(4).id).toBe('p5')

    table.add({ player: p6, seat: 5 })
    expect(table.at(4).id).toBe('p5')

    table.add({ player: p6, seat: 4 })
    expect(table.at(4).id).toBe('p6')

    expect(table.indexOf('p2')).toBe(1)
    expect(table.indexOf('p5')).toBe(-1)

    expect(table.button()).toBe(p6)
    table.advance()
    expect(table.button()).toBe(p4)
    expect(table.at(0).id).toBe('p6')

    table.options.seats = 2
    table.reset()
    expect(table.at(0)).toBe(null)
    table.add({ seat: 2, player: p1 })
    expect(table.indexOf('p1')).toBe(-1)
  })
})