// default values
const WIDTH = localStorage.getItem(`rangeX`) || 20;
const HEIGHT = localStorage.getItem(`rangeY`) || 20;

// displays state on DOM object
class Display {
    constructor(parent, state) {
        this.parent = parent;
        this.state = state;
        this.dom = null;
        if (state) {
            this.update(this.state);
        }
    }

    update(newState) {
        if (this.dom) this.dom.remove();
        this.dom = document.createElement('table');
        this.dom.className = 'game';
        const width = '720';
        const cellDimension = Math.min(width / newState.level.width, (screen.availHeight - 300) / newState.level.height);
        this.dom.width = (cellDimension * newState.level.width) + 'px';

        for (let y = 0; y < newState.level.height; y++) {
            let row = document.createElement('tr');
            this.dom.appendChild(row);
            for (let x = 0; x < newState.level.width; x++) {
                let cell = document.createElement('td');
                cell.width = cell.height = cellDimension + 'px';
                cell.className = newState.level.cells[y][x] ? 'live' : 'dead';
                row.appendChild(cell);
            }
        }
        this.parent.appendChild(this.dom);
    }
}

// represents starting level
// if cells => extending given width or height with given pos
// pos can be "left top right bottom" string with all, some or none elements
// else creating random level
class Level {
    constructor(cells, width, height, pos) {
        if (cells) {
            // trying to extend with given width, height, pos
            this.cells = this._extendCells(cells, width, height, pos);
        } else {
            this.cells = this._randomCells(width ? width : WIDTH, height ? height : HEIGHT);
        }
    }

    get width() {
        return this.cells[0].length;
    }

    get height() {
        return this.cells.length;
    }

    static _parsePos(pos) {
        let splitted = pos.trim().split(/\s+/);
        if (splitted.indexOf('left') >= 0 && splitted.indexOf('right') >= 0) {
            splitted.splice(splitted.indexOf('left'), 1);
            splitted.splice(splitted.indexOf('right'), 1);
        }
        if (splitted.indexOf('top') >= 0 && splitted.indexOf('bottom') >= 0) {
            splitted.splice(splitted.indexOf('top'), 1);
            splitted.splice(splitted.indexOf('bottom'), 1);
        }
        return splitted;
    }

    _extendCells(cells, width, height, pos) {
        let extended = pos ? Level._parsePos(pos) : [];
        console.log('extended', extended, `starting to extend to w=${width} h=${height} `, cells);
        if (width) {
            let toExtend = width - cells[0].length;
            if (toExtend > 0) {
                for (let w = 0; w < toExtend; w++) {
                    cells = cells.map(function (row, counter) {
                        if (extended.includes('left')) {
                            row.push(0);
                        } else if (extended.includes('right')) {
                            row.unshift(0);
                        } else {
                            (w % 2) ? row.unshift(0): row.push(0);
                        }
                        return row
                    })
                }
            }
        }
        if (height) {
            let toExtend = height - cells.length;
            if (toExtend > 0) {
                for (let h = 0; h < toExtend; h++) {
                    let row = new Array(Number.parseInt(cells[0].length));
                    row.fill(0);
                    if (extended.includes('top')) {
                        cells.push(row);
                    } else if (extended.includes('bottom')) {
                        cells.unshift(row);
                    } else {
                        (h % 2) ? cells.unshift(row): cells.push(row);
                    }
                }
            }
        }
        console.log('after extending ', cells);
        return cells;
    }

    _randomCells(width, height) {
        let cells = [];
        for (let y = 0; y < height; y++) {
            cells.push([]);
            for (let x = 0; x < width; x++) {
                let status = Math.round(Math.random());
                cells[y].push(status);
            }
        }
        return cells;
    }
}

// constructs State object, representing level
class State {
    constructor(startLevel) {
        this.level = startLevel;
    }

    update(borderless = true) {
        // updates with Conway’s Game of Life algorithm
        let {
            cells,
            width,
            height
        } = this.level;
        let newCells = cells.map((row, y) => {
            return row.map((cell, x) => {
                let counter = 0;
                for (let difX = -1; difX <= 1; difX++) {
                    for (let difY = -1; difY <= 1; difY++) {
                        if (difX || difY) {
                            let siblingX = x + difX,
                                siblingY = y + difY;
                            if (borderless) {
                                siblingX >= width ? siblingX = 0 : siblingX < 0 ? siblingX = width - 1 : null;
                                siblingY >= height ? siblingY = 0 : siblingY < 0 ? siblingY = height - 1 : null;
                            }
                            try {
                                cells[siblingY][siblingX] && counter++;
                            } catch (e) {};
                        }
                    }
                }
                // console.log(`${cell} cell at (${x}, ${y}) => counter=${counter}`);
                if (cell) {
                    if (counter < 2 || counter > 3) {
                        return State.reverseStatus(cell);
                    } else return cell;
                } else if (counter === 3) {
                    return State.reverseStatus(cell);
                } else return cell;
            })
        });
        return new State(new Level(newCells));
    }

    static reverseStatus(status) {
        // 1 => 0 vice versa
        return 1 - status;
    }
}

// Array of State objects
class States {
    constructor(firstState) {
        this.states = [firstState];
        this.current = 0;
    }

    getCurrentState() {
        return this.states[this.current];
    }

    isAtEnd() {
        return this.states.length - 1 === this.current;
    };

    isAtStart() {
        return 0 === this.current;
    };

    currentIncrement(i) {
        this.current += i;
    };

    setAtFirst() {
        this.current = 0;
    };

    setAtLast() {
        this.current = this.states.length - 1;
    };
}