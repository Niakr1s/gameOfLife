const WIDTH = 500, HEIGHT = 400; // table properties

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

        for (let y = 0; y < newState.level.height; y++) {
            let row = document.createElement('tr');
            this.dom.appendChild(row);
            for (let x = 0; x < newState.level.width; x++) {
                let col = document.createElement('td');
                col.className = newState.level.cells[y][x];
                row.appendChild(col);
            }
        }
        this.parent.appendChild(this.dom);
    }
}


class Level {
    constructor(cells) {
        // if cells are omitted we initializing it with random coordinates
        if (!cells) {
            this.width = WIDTH;
            this.height = HEIGHT;
            cells = this.randomCells();
        } else {
            this.width = cells[0].length;
            this.height = cells.length;
        }
        this.cells = cells;
    }

    randomCells() {
        let cells = [];
        for (let y = 0; y < this.height; y++) {
            cells.push([]);
            for (let x = 0; x < this.width; x++) {
                let status = Math.round(Math.random()) === 0 ? 'dead' : 'live';
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
                            if (this.level.cells[y + difY][x + difX] === 'live' && (difX || difY)) counter += 1;
                        } catch (e) {
                        }
                    }
                }
                // console.log(`${cell} cell at (${x}, ${y}) => counter=${counter}`);
                if (cell === 'live') {
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
        // 'live' => 'dead' vice versa
        return status === 'dead' ? 'live' : 'dead';
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


let level = new Level();
let state = new State(level);
let states = new States(state);

let display = new Display(document.querySelector('#display'), state);

// gui
let backButton = document.querySelector('#back');
let forwardButton = document.querySelector('#forward');
let autoButton = document.querySelector('#auto');
let stopButton = document.querySelector('#stop');
let output = document.querySelector('#output');

backButton.addEventListener('click', function (e) {
    if (!states.isAtStart()) {
        states.currentIncrement(-1);
        display.update(states.getCurrentState());
    }
});

forwardButton.addEventListener('click', function (e) {
    if (states.isAtEnd()) { // if we at last element => create new state
        let newState = states.getCurrentState().update();
        states.states.push(newState);
    }
    states.currentIncrement(1);
    display.update(states.getCurrentState());
});

let timeout;
autoButton.addEventListener('click', function (e) {
   timeout = setInterval(function () {
        forwardButton.click();
   }, 100);
   autoButton.disabled = true;
});

stopButton.addEventListener('click', function (e) {
   if (timeout) {
       clearInterval(timeout);
       autoButton.disabled = false;
   }
});