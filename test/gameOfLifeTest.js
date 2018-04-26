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
        });
        it('Testing extend cells with given width and height', function () {
            let tests = [
                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: 3,
                    height: 3,
                },


                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: 0,
                    height: 0,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: -10,
                    height: -10,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]],
                    width: 4,
                    height: 2,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 0, 0]],
                    width: 2,
                    height: 4,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]],
                    width: 5,
                    height: 5,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: null,
                    height: 5,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: 5,
                    height: null,
                },

            ];
            tests.forEach(function (test, counter) {
                let level = new Level(test.cells, test.width, test.height);
                assert.deepStrictEqual(level.cells, test.expected, 'test #' + counter);
            })
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
                },
                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
                },
                {
                    cells: [[1, 0, 1], [0, 1, 0], [1, 1, 0]],
                    expected: [[0, 1, 0], [0, 0, 1], [1, 1, 0]],
                },
                {
                    cells: [[0, 0, 0], [1, 0, 0], [0, 0, 1]],
                    expected: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                },
                {
                    cells: [[0, 1, 1], [1, 0, 0], [1, 0, 1]],
                    expected: [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
                },
            ];
            tests.forEach(function (test, counter) {
                let level = new Level(test.cells);
                let state = new State(level);
                let newState = state.update();
                assert.deepStrictEqual(newState.level.cells, test.expected, 'test #' + counter);
            })
        })
    })
});
