let level, firstState, states, display = new Display(document.querySelector('#display'));

// init level, firstState, states, display with new Level object
function outputInit(newLevel) {
    level = newLevel;
    firstState = new State(level);
    states = new States(firstState);
    display.update(firstState);
}

// initializing new random level
outputInit(new Level());

// gui
let controlButtons = document.querySelector('#controlButtons');
let firstButton = document.querySelector('#first');
let backButton = document.querySelector('#back');
let forwardButton = document.querySelector('#forward');
let lastButton = document.querySelector('#last');
let autoButton = document.querySelector('#auto');
let stopButton = document.querySelector('#stop');
let output = document.querySelector('#output');
output.textContent = '0-й шаг';
let random = document.querySelector('#random');


let rangeX = document.querySelector('#x');
let rangeY = document.querySelector('#y');
rangeX.value = WIDTH;
rangeY.value = HEIGHT;
changeText('По горизонтали: ', rangeX);
changeText('По вертикали: ', rangeY);

function changeText(text, range) {
    let parent = range.parentNode;
    parent.textContent = text + range.value;
    parent.appendChild(range);
}

let levelSelectorForm = document.querySelector('#levelSelectorForm');
levels.forEach(function (e, counter) {
    let option = document.createElement('option');
    option.textContent = e.description;
    option.value = counter;
    levelSelectorForm.select.appendChild(option);
});

// listeners section //

// starting interesting levels
levelSelectorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    outputInit(new Level(levels[this.select.value].level));
});

// changing output text every time we are clicking any button in controlButton section
controlButtons.addEventListener('click', function (e) {
    output.textContent = states.current + '-й шаг';
});

// back one step
backButton.addEventListener('click', function (e) {
    if (!states.isAtStart()) {
        states.currentIncrement(-1);
        display.update(states.getCurrentState());
    }
});

// forward one step
forwardButton.addEventListener('click', function (e) {
    if (states.isAtEnd()) { // if we at last element => create new firstState
        let newState = states.getCurrentState().update();
        states.states.push(newState);
    }
    states.currentIncrement(1);
    display.update(states.getCurrentState());
});

// first state
firstButton.addEventListener('click', function (e) {
    states.setAtFirst();
    display.update(states.getCurrentState());
});

// last state
lastButton.addEventListener('click', function (e) {
    states.setAtLast();
    display.update(states.getCurrentState());
});

// auto stepping
let timeout;
autoButton.addEventListener('click', function (e) {
    timeout = setInterval(function () {
        forwardButton.click();
    }, 50);
    autoButton.disabled = true;
});

// stop suto
stopButton.addEventListener('click', function (e) {
    if (timeout) {
        clearInterval(timeout);
        autoButton.disabled = false;
    }
});

// changing text on ranges change
rangeX.addEventListener('change', function (e) {
    changeText('По горизонтали: ', rangeX)
});

rangeY.addEventListener('change', function (e) {
    changeText('По вертикали: ', rangeY)
});

// creating random level, states and updating display
random.addEventListener('click', function (e) {
    outputInit(new Level(null, rangeX.value, rangeY.value));
});