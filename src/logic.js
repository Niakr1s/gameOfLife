const WIDTH = 20, HEIGHT = 15; // table properties

class Display {
    constructor(parent, state) {
        this.parent = parent;
        this.state = state;
        this.dom = null;
        this.update(this.state);
    }

    update(newState) {
        if (this.dom) this.dom.remove();
        this.dom = document.createElement('table');
        this.dom.className = 'game';
        this.dom.width = '500px';
        let cellDimension = Number.parseInt(this.dom.width) / WIDTH + 'px';
        console.log(cellDimension);
        console.log(newState);

        for (let y = 0; y < newState.level.height; y++) {
            let row = document.createElement('tr');
            this.dom.appendChild(row);
            for (let x = 0; x < newState.level.width; x++) {
                let cell = document.createElement('td');
                cell.height = cellDimension;
                cell.width = cellDimension;
                cell.className = newState.level.cells[y][x] ? 'live' : 'dead';
                row.appendChild(cell);
            }
        }
        this.parent.appendChild(this.dom);
    }
}


class Level {
    constructor(cells=null, width=null, height=null) {
        // if cells are omitted we initializing it with random coordinates
        if (cells) {
            this.width = cells[0].length;
            this.height = cells.length;
        } else {
            this.width = width? width : WIDTH;
            this.height = height? height : HEIGHT;
            cells = this.randomCells();
        }
        this.cells = cells;
    }

    randomCells() {
        let cells = [];
        for (let y = 0; y < this.height; y++) {
            cells.push([]);
            for (let x = 0; x < this.width; x++) {
                let status = Math.round(Math.random());
                cells[y].push(status);
            }
        }
        return cells;
    }
}

class State {
    constructor(level) {
        this.level = level;
    }

    update() {
        // updates with Conway’s Game of Life algorithm
        let newCells = this.level.cells.map((row, y) => {
            return row.map((cell, x) => {
                let counter = 0;
                for (let difX = -1; difX <= 1; difX++) {
                    for (let difY = -1; difY <= 1; difY++) {
                        try {
                            // difX && difY shouldn't be both 0
                            if (this.level.cells[y + difY][x + difX] && (difX || difY)) counter += 1;
                        } catch (e) {
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

class States {
    // bunch of State classes
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
        output.textContent = states.current + '-й шаг';
    };
}

