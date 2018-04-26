// let assert = require('chai');
let assert = chai.assert;
// let gameOfLife = require('../src/gameOfLife');

describe('Level', function () {
    describe('#constructor()', function () {
        it('Level.cells should not contain nothing except 1 or 0', function () {
            for (let i = 1000; i; i--) {
                let level = new Level();
                assert.strictEqual(level.cells.every(row => {
                    return row.every(cell => {
                        return cell === 1 || cell === 0;
                    })
                }), true);
            }
        })
    })
});

describe('State', function () {
    describe('#update()', function () {
        it('Testing Conway’s Game of Life algorithm with some interestingLevels', function () {
            let tests = [
                {
                    cells: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    expected: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    message: 'all dead',
                },
                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
                    message: 'all live',
                },
                {
                    cells: [[1, 0, 1], [0, 1, 0], [1, 1, 0]],
                    expected: [[0, 1, 0], [0, 0, 1], [1, 1, 0]],
                    message: 'random 1',
                },
                {
                    cells: [[0, 0, 0], [1, 0, 0], [0, 0, 1]],
                    expected: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    message: 'random 2',
                },
                {
                    cells: [[0, 1, 1], [1, 0, 0], [1, 0, 1]],
                    expected: [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
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