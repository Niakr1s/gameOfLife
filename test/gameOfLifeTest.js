// let assert = require('chai');
let assert = chai.assert;
// let gameOfLife = require('../src/gameOfLife');

describe('Level', function () {
    describe('#constructor()', function () {
        it('Level.cells should not contain nothing except "live" or "dead"', function () {
            for (let i = 1000; i; i--) {
                let level = new Level();
                assert.strictEqual(level.cells.every(row => {
                    return row.every(cell => {
                        return cell === 'live' || cell === 'dead';
                    })
                }), true);
            }
        })
    })
});

describe('State', function () {
    describe('#update()', function () {
        it('Testing Conway’s Game of Life algorithm with some levels', function () {
            let tests = [
                {
                    cells: [['dead', 'dead', 'dead'], ['dead', 'dead', 'dead'], ['dead', 'dead', 'dead']],
                    expected: [['dead', 'dead', 'dead'], ['dead', 'dead', 'dead'], ['dead', 'dead', 'dead']],
                    message: 'all dead',
                },
                {
                    cells: [['live', 'live', 'live'], ['live', 'live', 'live'], ['live', 'live', 'live']],
                    expected: [['live', 'dead', 'live'], ['dead', 'dead', 'dead'], ['live', 'dead', 'live']],
                    message: 'all live',
                },
                {
                    cells: [['live', 'dead', 'live'], ['dead', 'live', 'dead'], ['live', 'live', 'dead']],
                    expected: [['dead', 'live', 'dead'], ['dead', 'dead', 'live'], ['live', 'live', 'dead']],
                    message: 'random 1',
                },
                {
                    cells: [['dead', 'dead', 'dead'], ['live', 'dead', 'dead'], ['dead', 'dead', 'live']],
                    expected: [['dead', 'dead', 'dead'], ['dead', 'dead', 'dead'], ['dead', 'dead', 'dead']],
                    message: 'random 2',
                },
                {
                    cells: [['dead', 'live', 'live'], ['live', 'dead', 'dead'], ['live', 'dead', 'live']],
                    expected: [['dead', 'live', 'dead'], ['live', 'dead', 'live'], ['dead', 'live', 'dead']],
                    message: 'random 3',
                },
            ];
            tests.forEach(function (test) {
                let level = new Level(test.cells);
                let state = new State(level);
                let newState = state.update();
                assert.deepStrictEqual(newState.level.cells, test.expected, test.message);
            })
        })
    })
});