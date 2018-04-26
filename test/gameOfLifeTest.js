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
                    expected: [[0, 0, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 0, 0]],
                    width: null,
                    height: 5,
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0]],
                    width: 5,
                    height: null,
                },

            ];
            tests.forEach(function (test, counter) {
                let level = new Level(test.cells, test.width, test.height);
                assert.deepStrictEqual(level.cells, test.expected, 'test #' + counter + ' ' + level.cells + ';' + test.expected);
            })
        });

        it('Testing extend cells with given width and height and pos', function () {
            let tests = [
                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [0, 0, 1, 1, 1]],
                    width: 5,
                    height: 2,
                    extendedPos: 'right',
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[0, 0, 0], [0, 0, 0], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    width: 2,
                    height: 5,
                    extendedPos: 'bottom',
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1, 0, 0], [1, 1, 1, 0, 0], [1, 1, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
                    width: 5,
                    height: 5,
                    extendedPos: 'left top',
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
                    width: null,
                    height: 5,
                    extendedPos: 'left top',
                },

                {
                    cells: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
                    expected: [[0, 0, 1, 1, 1], [0, 0, 1, 1, 1], [0, 0, 1, 1, 1]],
                    width: 5,
                    height: null,
                    extendedPos: 'right bottom',
                },

            ];
            tests.forEach(function (test, counter) {
                let level = new Level(test.cells, test.width, test.height, test.extendedPos);
                assert.deepStrictEqual(level.cells, test.expected, 'test #' + counter + ' ' + level.cells + ';' + test.expected);
            })
        });

    });
    describe('#_parsePos', function () {
        it('Parsing some extendedPos strings', function () {
            let tests =
                [
                    {
                        extendedPos: 'left top',
                        expected: ['left', 'top'],
                    },

                    {
                        extendedPos: 'left top right',
                        expected: ['top'],
                    },


                    {
                        extendedPos: 'left top right bottom',
                        expected: [],
                    },

                    {
                        extendedPos: 'top right bottom',
                        expected: ['right'],
                    },
                ];
            tests.forEach(function (test, counter) {
                assert.deepStrictEqual(Level._parsePos(test.extendedPos), test.expected, 'test #' + counter);
            });

        });
    });
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

describe('LocalStorage', function () {
    describe('const WIDTH, HEIGHT', function () {
        it('WIDTH, HEIGHT should be not null when no localStorage value. ATTENTION: it deletes "rangeX" and "rangeY" from localStorage, so RELOAD AT LEAST ONCE', function () {
            localStorage.removeItem('rangeX');
            localStorage.removeItem('rangeY');
            assert.isNotNull(WIDTH, 'checking WIDTH');
            assert.isNotNull(HEIGHT, 'checking HEIGHT');
        })
    })
});
